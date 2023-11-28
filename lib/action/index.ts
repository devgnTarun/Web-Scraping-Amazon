"use server"

import { revalidatePath, revalidateTag } from "next/cache";
import { connectToDb } from "../db";
import Product from "../models/product.model";
import { scrateAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";
import { shareProduct } from "../bot";
import { nanoid } from "nanoid";
import { title } from "process";

export async function scarpeAndStoreProduct(productUrl: string) {
    if (!productUrl) return;

    try {
        await connectToDb();

        const scrapedProduct = await scrateAmazonProduct(productUrl);

        if (!scrapedProduct) return;

        let product = scrapedProduct;
        // 2.01.
        const existProduct = await Product.findOne({ url: product.url });

        if (existProduct) {
            const updatePriceHistory: any = [
                ...existProduct.priceHistory,
                { price: scrapedProduct.currentPrice }
            ];

            product = {
                ...scrapedProduct,
                priceHistory: updatePriceHistory,
                lowestPrice: getLowestPrice(updatePriceHistory),
                highestPrice: getHighestPrice(updatePriceHistory),
                averagePrice: getAveragePrice(updatePriceHistory)
            }
        }

        const convertedUrl = `${scrapedProduct.url}&tag=buying-sense-21`;

        const newProduct = await Product.findOneAndUpdate({
            url: scrapedProduct.url, affilateUrl: convertedUrl
        },
            product,
            { upsert: true, new: true }
        );

        //telegram forwarding
        const shortTitle = scrapedProduct.title.length < 40 ? scrapedProduct.title : `${scrapedProduct.title.substring(0, 40)}...`

        const telegramData = `
             ${shortTitle} 
           In Just 🔥₹${scrapedProduct.currentPrice}🔥
           🔥🔥🔥 Buy this on amazon 🔥🔥🔥
           https://buying-sense.vercel.app/product/${newProduct._id}
           🔥 Loot is live 🔥 
            Direct Amazon Url : ${convertedUrl}
    `;

        await shareProduct(scrapedProduct.image, telegramData);

        revalidatePath(`/product/${newProduct._id}`);
        revalidatePath('/', 'page')
        revalidatePath('/product', 'page')
    } catch (error: any) {
        console.log(`Error to create product : ${error.message} `)
    }
}

export async function getProductById(productId: string) {
    try {
        await connectToDb();

        const product = await Product.findOne({ _id: productId });

        if (!product) return null;

        return product;
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        await connectToDb();

        const product = await Product.find().sort({ createdAt: -1 });

        if (!product) return null;

        revalidatePath('/', 'page')
        revalidatePath('/product', 'page')
        return product;
    } catch (error) {
        console.log(error)
    }
}


export async function getSimilarProduct(productId: string) {
    try {
        await connectToDb();

        const currentProduct = await Product.findById(productId);
        if (!currentProduct) return null;

        const similarProducts = await Product.find({ _id: { $ne: productId } }).limit(3);

        return similarProducts;
    } catch (error) {
        console.log(error)
    }
}

export async function addUserEmailToProduct(productId: string, userEmail: string) {
    try {
        await connectToDb();

        const product = await Product.findById(productId);

        if (!product) return false;

        const userExists = await product.users.some((user: User) => user.email === userEmail);

        if (!userExists === true) {
            await product.users.push({ email: userEmail });
            await product.save();


            const emailContent = await generateEmailBody(product, 'WELCOME');

            await sendEmail(emailContent, [userEmail])
        }
    } catch (error) {

    }
}