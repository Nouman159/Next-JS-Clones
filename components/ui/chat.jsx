import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Mic, Plus, Copy, Share2, Circle, Trash, Info, Trash2, CopyPlus, BookCheck, Captions, FileBox, Phone, Settings, Volume2, SquareFunction } from 'lucide-react';
import React, { useState } from 'react';

const text = '1a2fb3-4c5sd6-7e8f9-0g1h2e2-121s9di1'

export default function Chat() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [buttonActiveIndex, setButtonActiveIndex] = useState(0);
    const handleClick = (index) => {
        setActiveIndex(index);
    };
    const handleChange = (index) => {
        setButtonActiveIndex(index);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
    };

    const divData = [
        { name: 'New Assistant', text: 'Hello', icon: <Mic className='ml-3 mt-1 w-4 h-4' /> },
        { name: 'Ava', text: 'Goodbye', icon: <Mic className='ml-3 mt-1 w-4 h-4' /> },
        { name: 'Leo', text: 'Welcome', icon: <Mic className='ml-3 mt-1 w-4 h-4' /> },
        { name: 'Onyx', text: 'Here', icon: <Mic className='ml-3 mt-1 w-4 h-4' /> },
        { name: 'Assistant', text: 'Here', icon: <Mic className='ml-3 mt-1 w-4 h-4' /> },
    ];
    const dataButtons = [
        { title: 'Model', icon: <FileBox className='w-4 h-4 mr-1 mt-1' /> },
        { title: 'Transcriber', icon: <Captions className='w-4 h-4 mr-1 mt-1' /> },
        { title: 'Voice', icon: <Volume2 className='w-4 h-4 mr-1 mt-1' /> },
        { title: 'Functions', icon: <SquareFunction className='w-4 h-4 mr-1 mt-1' /> },
        { title: 'Advanced', icon: <Settings className='w-4 h-4 mr-1 mt-1' /> }
    ]

    return (
        <main className='bg-[#2d2e2d] text-white w-full h-auto flex'>
            <section className="p-4 flex justify-center w-3/12 min-h-full border-r border-[#5f615f]">
                <div className="flex flex-col">
                    <button className="bg-opacity-25 hover:bg-opacity-50 text-white border border-[#5f615f] rounded-lg px-4 pr-24 py-3 shadow-lg focus:outline-none flex items-center mb-4">
                        <Plus className="mr-2" />
                        Create New Assistant
                    </button>

                    {divData.map((item, index) => (
                        <div
                            key={index}
                            className={` rounded-lg py-3 px-4 flex justify-between cursor-pointer ${activeIndex === index ? 'bg-[#444]' : ''}`}
                            style={{ width: '296px' }}
                            onClick={() => handleClick(index)}
                        >
                            <div> {item.name}</div>
                            <div className='flex text-[#5f615f]'>
                                {item.text}
                                {item.icon}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className='flex flex-col w-9/12'>
                <section className=" h-full flex justify-center mx-4 my-2">
                    <div className='w-full m-1 h-36 bg-[#252626] text-white rounded-md'>
                        <div className='flex justify-between m-6'>
                            <div className='flex flex-col'>
                                <div className='text-3xl'>New Assistant</div>
                                <div className='flex mt-3'>
                                    <div className='mt-2 '>{text}</div>
                                    <div className='flex mt-1 ml-3 gap-3'>
                                        <div className='bg-[#4f5052] p-2 rounded-lg'>
                                            <Copy className='w-4 h-4 cursor-pointer' onClick={() => { copyToClipboard() }} />
                                        </div>
                                        <div className='bg-[#4f5052] p-2 rounded-lg'>
                                            <Share2 className='w-4 h-4' />
                                        </div>
                                        <div className='bg-[#4f5052] p-2 rounded-lg'>
                                            <Circle className='w-4 h-4' style={{ fill: 'white' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-3 mt-3'>
                                <div className='bg-[#4f5052] p-2 h-10 rounded-lg'>
                                    <CopyPlus className='w-5 h-5 ' />
                                </div>
                                <div className='bg-[#4f5052] p-2 h-10 rounded-lg'>
                                    <Trash2 className='w-5 h-5' />
                                </div>
                                <Button className="bg-[#3da891]">
                                    <Phone className='w-5 h-5 mr-2' style={{ fill: 'white' }} />
                                    Talk with New Assitant
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="h-full flex justify-center flex-col mx-4 my-2">
                    <div className='w-full m-1 h-auto bg-[#252626] text-white rounded-md'>
                        <div className='flex justify-between m-8'>

                            <div className='bg-[#444] p-1 flex text-black rounded'>
                                {dataButtons.map((item, index) => (
                                    <div key={index} className={`flex p-1 cursor-pointer rounded pr-3 ${buttonActiveIndex === index ? 'bg-[#34785b]' : ''}`}
                                        onClick={() => handleChange(index)}
                                    >{item.icon} {item.title}</div>
                                ))}

                            </div>
                            <div className='flex gap-3'>
                                <Button className="bg-[#444]">
                                    <Trash className='w-4 h-4 mr-2' />
                                    Discard
                                </Button>
                                <Button className="bg-[#3da891]">
                                    <BookCheck className='w-4 h-4 mr-2' />
                                    Publish
                                </Button>
                            </div>
                        </div>
                        <div className='w-12/12 flex flex-col justify-between h-auto  text-white rounded-md'>
                            <div className='flex justify-between ml-8 mt-2 mr-8 mb-4 '>
                                <div className='flex gap-2'>
                                    First Message
                                    <Info className='w-5 h-5 mt-1' />
                                </div>
                            </div>
                            <Input placeholder='salsmals' className='bg-[#252626] placeholder:text-white border border-gray-600 ml-8 mr-8 w-12/12' />
                            <div className='flex justify-between ml-8 mt-2 mr-8 mb-4 '>
                                <div className='flex gap-2'>
                                    System Prompt
                                    <Info className='w-5 h-5 mt-1' />
                                </div>
                            </div>
                            <textarea style={{ height: '177px' }} className='border border-gray-600 bg-[#252626] ml-8 mr-8 mb-8 p-2 w-12/12 rounded' placeholder='Add your prompt here...' ></textarea>
                        </div>
                    </div>

                </section>
            </div>
        </main>
    );
}
