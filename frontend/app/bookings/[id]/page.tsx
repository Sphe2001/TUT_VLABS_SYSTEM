'use client';
import React, { useState, useEffect } from 'react';
import { useBookMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


interface Props {
	params: {
		id: string;   
	}
}
	
export default function Page({ params }: Props) {
	const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const { id } = params;

        const makeBooking = async () => {
            setIsLoading(true);
            setIsError(false);
            setIsSuccess(false);

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/bookings/create/${id}/`, {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to create booking');
                }

                const result = await response.json();
                console.log('Booking created', result);
                setIsSuccess(true);
                toast.success('Booking Created');
                router.push('/dashboard');
            } catch (error) {
                console.error('Failed to create booking', error);
                setIsError(true);
                toast.error('Failed to make booking');
            } finally {
                setIsLoading(false);
            }
        };

        makeBooking();
    }, [params, router]);


	return(
        <div className="">
			<header className='bg-white shadow'>
				<div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                    
					<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
						Booking
					</h1>
					
				</div>
			</header>
			<div className='text-3xl font-bold tracking-tight text-gray-900'>
				{isLoading && <p>Creating booking...</p>}
				{isSuccess && <p>Booking created</p>}
				{isError && <p>Failed to make booking</p>}
			</div>
        </div>
    )
}