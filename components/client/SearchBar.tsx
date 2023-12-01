'use client'

import { scarpeAndStoreProduct } from "@/lib/action"
import { FormEvent, useState } from "react"
import toast from "react-hot-toast"

const SearchBar = () => {

    const [searchText, setSearchText] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const isAmazonValidUrl = (url: string) => {
        try {
            const parsedUrl = new URL(url);
            const hostName = parsedUrl.hostname;
            if (
                hostName.includes('amazon.com') ||
                hostName.includes('amazon.') ||
                hostName.endsWith('amazon')
            ){
                return true
            }
        } catch (error) {
            return false
        }
        return false
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValidLink = isAmazonValidUrl(searchText)
        if(!isValidLink) return alert('Please enter the valid amazon link!');

        try {
            setIsLoading(true)
            
             await scarpeAndStoreProduct(searchText);
            toast.success('Product Added and Shared!')

           
        } catch (error : any) {
            console.log(error);
            toast.error('Try again!');
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
            <input value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Enter Product Link!" className="searchbar-input" />
            <button type="submit" className="searchbar-btn" disabled={searchText === ''}>
                {isLoading ? 'Searching...' : 'Search'}
            </button>
        </form>
    )
}

export default SearchBar