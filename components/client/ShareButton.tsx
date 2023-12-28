'use client'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface ShareType {
    url: string,
    title: string
}

const ShareButton = ({ shareProducts }: { shareProducts: ShareType }) => {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                if (shareProducts && shareProducts.url && shareProducts.title) {
                    await navigator.share({
                        title: shareProducts.title,
                        url: `/${shareProducts.url}`,
                    });
                    console.log('Product shared successfully');
                } else {
                    console.error('Invalid share data');
                }
            } catch (error) {
                console.error('Error sharing product:', error);
            }
        } else {
            console.warn('Web Share API not supported in this browser');
        }
    };

    return (
        <button onClick={handleShare} className="bg-gray-500 text-white px-4 py-2 rounded-full flex items-center">
            <FontAwesomeIcon icon={faShare} className="  text-center" />
        </button>
    )
}

export default ShareButton