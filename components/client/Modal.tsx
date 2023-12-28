'use client'

import { FormEvent, Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image';
import { addUserEmailToProduct } from '@/lib/action';

interface Props {
    productId: string
};

const Modal = ({ productId }: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('')

    const openBox = () => setIsOpen(true);
    const closeBox = () => setIsOpen(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        await addUserEmailToProduct(productId, email);

        setIsLoading(false);
        setEmail('');
        setIsOpen(false)
    }



    return (
        <>
            <button type='button' className='bg-gray-900 text-white px-6 py-3 rounded-full mb-4 block w-[130px] text-center my-5 text-sm' onClick={openBox}>
                Track
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' open={isOpen} onClose={closeBox} className='dialog-container'>
                    <div className="mix-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <Dialog.Overlay className={'fixed inset-0'} />
                        </Transition.Child>
                        <span className='inline-block h-screen align-middle' area-hidden='true' />
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-195'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >

                            <div className="dialog-content">
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <div className="p-3 border border-gray-200 rounded-10">
                                            <Image src={'/assets/icons/logo.svg'}
                                                alt='logo'
                                                width={28}
                                                height={28}
                                            />
                                        </div>
                                        <Image src={'/assets/icons/x-close.svg'}
                                            alt='logo'
                                            width={28}
                                            height={28}
                                            className='cursor-pointer'
                                            onClick={closeBox}
                                        />
                                    </div>

                                    <h4 className='dialog-head_text'>
                                        Stay Tuned with us, for getting alerts when your favourite product price drop or comes in stock!
                                    </h4>

                                    <p className='text-sm text-gray-600  mt-2'>
                                        Never miss a chance to buy at low ~ <span> By Smart Person</span>
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className='flex flex-col mt-5'>
                                    <label htmlFor="email" className='text-sm font-medium text-gray-700'>
                                        Email
                                    </label>
                                    <div className="dialog-input_container">
                                        <Image
                                            src='/assets/icons/mail.svg'
                                            alt='mail'
                                            width={18}
                                            height={18}
                                        />
                                        <input type="email" required id='email' placeholder='Enter Your Email!' className='dialog-input' value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <button type='submit' className="dialog-btn">
                                        {isLoading ? 'Sending...' : 'Track'}
                                    </button>
                                </form>
                            </div>

                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Modal