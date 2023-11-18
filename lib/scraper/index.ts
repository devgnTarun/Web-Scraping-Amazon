import axios from "axios";
import * as cheerio from 'cheerio';
import { extractCurrency, extractDescription, extractPrice } from "../utils";

export async function scrateAmazonProduct(url: string) {
    if (!url) return;


    // Bright data creds 
    const user = String(process.env.BRIGHT_DATA_USER);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth : {
            username : `${user}-session-${session_id}`,
            password,
        },
        host : 'brd.superproxy.io:22225',
        port,
        rejectedUnauthorized : false,
    }

    try {
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);

        const title = $('#productTitle').text().trim();

        const currentPrice = await extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
        );

        const originalPrice = await extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')
        )
        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

        const images = $('#imgBlkFront').attr('data-a-dynamic-image') ||
                      $('#landingImage').attr('data-a-dynamic-image') || '{}';
        // parsing images 
        const imageUrl = Object.keys(JSON.parse(images))

        const currency = await extractCurrency($('.a-price-symbol'));
        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");
        const description = await extractDescription($);
        const category = $('.a-link-normal.a-color-tertiary').text().trim();
        const data = {
            url ,
            affilateUrl : `${url}&tag=innovativex-21`,
            currency : currency || '$',
            image : imageUrl[0],
            title,
            currentPrice : Number(currentPrice) || Number(originalPrice),
            originalPrice : Number(originalPrice),
            priceHistory :  [],
            discountRate : Number(discountRate),
            category : category,
            reviewsCount : 160,
            stars : 4.5,
            isOutOfStock : outOfStock,
            description,
            lowestPrice : Number(currentPrice) || Number(originalPrice),
            highestPrice : Number(originalPrice) || Number(currentPrice),
            averagePrice : Number(originalPrice) || Number(currentPrice)
        };

       
      return data;
       

    } catch (error : any) {
        throw new Error(`Error occured in scarping product : ${error.message}`)
    }
}