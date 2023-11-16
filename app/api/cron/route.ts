import { connectToDb } from "@/lib/db";
import Product from "@/lib/models/product.model";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrateAmazonProduct } from "@/lib/scraper";
import { getAveragePrice, getEmailNotifType, getHighestPrice, getLowestPrice } from "@/lib/utils";
import { NextResponse } from "next/server";


export const maxDuration = 5;
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {

    try {
        await connectToDb();

        const products = await Product.find({});

        if (!products) throw new Error('No Product Found!');

        // scrape the latest products

        const updateProducts = await Promise.all(
            products.map(async (currentProduct) => {
                const scrapedProduct = await scrateAmazonProduct(currentProduct.url);

                if (!scrapedProduct) throw new Error('No Product Found!');

                const updatePriceHistory = [
                    ...currentProduct.priceHistory,
                    { price: scrapedProduct.currentPrice }
                ];

                const product = {
                    ...scrapedProduct,
                    priceHistory: updatePriceHistory,
                    lowerPrice: getLowestPrice(updatePriceHistory),
                    highestPrice: getHighestPrice(updatePriceHistory),
                    averagePrice: getAveragePrice(updatePriceHistory)
                }

                const updatedProduct = await Product.findOneAndUpdate({
                    url: product.url
                },
                    product,
                );

                // Check each products status and send email

                const emailNotifyType = getEmailNotifType(scrapedProduct, currentProduct);

                if(emailNotifyType && updatedProduct.users.lenght > 0) {
                    const productInfo = {
                        title : updatedProduct.title,
                        url : updatedProduct.url,
                    }

                    const emailContent = await generateEmailBody(productInfo , emailNotifyType);

                    const userEmails = updatedProduct.users.map((user : any) => user.email);

                    await sendEmail(emailContent, userEmails);
                }
                return updatedProduct;
            })
        )
            return NextResponse.json({
                message : 'Ok', data : updateProducts
            })

    } catch (error) {
        console.log(`Got an error : ${error}`)
    }

}