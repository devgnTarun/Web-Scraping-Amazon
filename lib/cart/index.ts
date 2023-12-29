'use server'

import { revalidatePath } from "next/cache";
import { connectToDb } from "../db";
import { cookies } from "next/headers";
import User from "../models/user.model";
import jwt, { JwtPayload } from 'jsonwebtoken';

interface ShareType {
    url: string,
    title: string
}
interface LocalType extends ShareType {
    amazonUrl: string,
    price: string,
    currency: string,
    reviews: string,
    image: string
}

export async function addToCart(productDetails: LocalType) {
    try {
        await connectToDb();
        const cookieStore = await cookies();
        const token = await cookieStore.get('auth')
        if (!token) return { success: false, message: 'Please login to like products!' };

        const decoded = await jwt.verify(token?.value, 'somethingfishy') as JwtPayload;


        if (!decoded || !decoded?.id) {
            return { success: false, message: 'Please login to access the resource!' };
        }

        const userId = decoded?.id;


        const user = await User.findById(userId);
        if (!user) {
            return { success: false, message: 'User not found!' };;
        }
        // Check if the product already exists in lovedProducts
        const productExists = user.lovedProducts.some(
            (prod: any) => prod.url === productDetails.url && prod.title === productDetails.title
        );

        if (productExists) {
            return { success: false, message: 'Product already exists in loved one!' };
        }

        // Add the product to the user's lovedProducts
        user.lovedProducts.push(productDetails);
        await user.save(); // Save the updated user document

        revalidatePath('/loved', 'page');

        return { success: true, message: 'Product added to loved products!' };
    } catch (error) {
        console.log(error)
    }
}

export async function getCartProduct() {
    try {
        await connectToDb();
        const cookieStore = await cookies();
        const token = await cookieStore.get('auth');
        if (!token) return { success: false, message: 'Please login to access cart' };

        const decoded = await jwt.verify(token?.value, 'somethingfishy') as JwtPayload;
        if (!decoded || !decoded?.id) {
            return { success: false, message: 'Please login to access the resource!' };
        }
        const userId = decoded?.id;
        const user = await User.findById(userId);

        if (!user) {
            return { success: false, message: 'User not found!' };
        }

        const lovedProducts = user.lovedProducts;

        return { success: true, lovedProducts }; // Return the fetched cart products
    } catch (error) {
        console.log(error);
        return { success: false, message: 'An error occurred while fetching cart products' };
    }
}


export const removeFromCart = async (url: any) => {
    try {
        await connectToDb();
        const cookieStore = await cookies();
        const token = await cookieStore.get('auth');
        if (!token) return { success: false, message: 'Please login to access cart' };

        const decoded = await jwt.verify(token?.value, 'somethingfishy') as JwtPayload;
        if (!decoded || !decoded?.id) {
            return { success: false, message: 'Please login to access the resource!' };
        }
        const userId = decoded?.id;
        const user = await User.findById(userId);

        if (!user) {
            return { success: false, message: 'User not found!' };
        }

        // Find the index of the product with the matching URL in the user's cart
        // Find the product by URL within the lovedProducts array
        const productToRemove = user.lovedProducts.find(
            (product: any) => product.url === url?.url
        );

        // Validate if the product exists in the user's lovedProducts
        if (!productToRemove) {
            return { success: false, message: 'Product not found in loved products!' };
        }

        // Get the index of the product within the lovedProducts array
        const productIndex = user.lovedProducts.indexOf(productToRemove);

        // Remove the product from the user's lovedProducts array
        if (productIndex !== -1) {
            user.lovedProducts.splice(productIndex, 1);
            await user.save();
        }
        revalidatePath('/loved', 'page')
        return { success: true, message: 'Product removed from cart!' };
    } catch (error) {
        console.error('Error removing product:', error);
        return { success: false, message: 'An error occurred while removing the product' };
    }
};
