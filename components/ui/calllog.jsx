import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CirclePlus, ArrowRight, SquareX } from 'lucide-react';
import callLogs from '../Data/callLogsData';
import ReactAudioPlayer from 'react-audio-player';
import { origins } from '../Data/origins';

const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()) {
        return 'Yesterday';
    } else {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
};
const countLogsForDay = (logs, date) => {
    return logs.filter(log => new Date(log.date).getDate() === new Date(date).getDate() &&
        new Date(log.date).getMonth() === new Date(date).getMonth() &&
        new Date(log.date).getFullYear() === new Date(date).getFullYear()).length;
};

const Calllog = () => {
    const [currentCallLog, setCurrentCallLog] = useState(callLogs[0]);
    const [show, setShow] = useState(true)
    const [filterValue, setFilterValue] = useState("");
    let currentDay = '';
    const setCurrentCallLogHandle = (call) => {
        if (call.status === 'Unread')
            call.status = 'Read'
        setCurrentCallLog(call);
        setShow(true)
    }

    const callLogsData = callLogs.filter(call =>
        call.phoneNumber.includes(filterValue)
    );
    const sortedCallLogs = callLogsData.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className='flex'>
            <section className='w-9/12 flex flex-col border border-r pr-2'>
                <div className='m-1 ml-4 flex gap-4'>
                    <Input
                        type="text"
                        className='w-3/12 h-8'
                        placeholder="Filter calls (Ph No)..."
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                    />

                    <Button variant="outline" className='w-36 h-8 border-dotted border-2'>
                        <CirclePlus className='pr-1 w-5 h-5' />
                        Functions
                    </Button>
                </div>
                <div className='flex flex-col'>
                    {sortedCallLogs.map((call, index) => {
                        const formattedDate = formatDate(call.date);
                        const logCount = countLogsForDay(sortedCallLogs, call.date);
                        const isDifferentDay = formattedDate !== currentDay;
                        currentDay = formattedDate;
                        const isSelected = currentCallLog && currentCallLog.id === call.id;

                        return (
                            <div key={index}>
                                {isDifferentDay && (
                                    <h2 className='bg-[#edf2ef] py-1 pl-8'>
                                        {formattedDate}
                                        <span className=''>
                                            &nbsp;&nbsp;
                                            {logCount}
                                        </span>
                                    </h2>
                                )}
                                <div className={`flex flex-row gap-12 justify-start ml-2 pl-2 py-1 cursor-pointer text-[#8a8585]  ${isSelected ? 'bg-gray-300' : 'hover:bg-slate-100'}`} onClick={() => setCurrentCallLogHandle(call)}>
                                    {(call.status === 'Unread') ?
                                        <div className='h-2 min-w-2 rounded-full bg-blue-500 mr-1 mt-2'></div>
                                        :
                                        <div className='inline-bloc flex align-middle h-2 min-w-2 mt-2 rounded-full mr-1'></div>
                                    }
                                    <div className='min-w-24'>
                                        {call.timeReceived}
                                    </div>
                                    <div className='min-w-24'>
                                        {call.phoneNumber}
                                    </div>
                                    <div className='min-w-28 flex overflow-hidden'>
                                        <ArrowRight style={{ "color": "#8a8585" }} />
                                        <div className='truncate'>
                                            {call.name}
                                        </div>
                                    </div>
                                    <div className='min-w-20'>
                                        {call.timeInMinutes}
                                    </div>
                                    <div className='w-auto overflow-hidden text-black flex'>
                                        <div className='truncate flex-grow'>
                                            {call.details}
                                        </div>
                                        {(call.additionalStatus) && (
                                            <div className='min-w-52 flex justify-end overflow-hidden'>
                                                <div className='flex flex-wrap gap-1'>
                                                    {call.additionalStatus.map((status, statusIndex) => (
                                                        <span key={statusIndex} className='px-1 text-sm border border-gray-300 rounded-lg'>
                                                            {status === 'Sales' && (
                                                                <span className='inline-block h-2 w-2 rounded-full bg-red-500 mr-1'></span>
                                                            )}
                                                            {status === 'human_resource' && (
                                                                <span className='inline-block h-2 w-2 rounded-full bg-blue-500 mr-1'></span>
                                                            )}
                                                            {status === 'Dispatch' && (
                                                                <span className='inline-block h-2 w-2 rounded-full bg-blue-500 mr-1'></span>
                                                            )}
                                                            {status}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className='w-3/12'>
                {(show === true) ? <>
                    <div className='flex justify-between p-4'>
                        <div className='text-2xl font-bold'>{currentCallLog.name}</div>
                        <div className='mt-2 flex gap-3' style={{ "color": "#8a8585" }} >
                            {currentCallLog.timeReceived}
                            <SquareX className='w-6 h-6 cursor-pointer' onClick={() => { setShow(false) }} />
                        </div>
                    </div>
                    <div className='inline-block  bg-gray-200 m-3 p-3 rounded-md' >Hi this is Kate from logistics. How can I help you today?
                        <div className='flex justify-end'>
                            <span className='text-sm'>0 : 12</span>
                        </div>
                    </div>
                    <div className='inline-block  bg-blue-200 m-3 p-3 rounded-md' >Pellentesque habitant morbi tristique senectus et netus et
                        <div className='flex justify-end'>
                            <span className='text-sm'>0 : 12</span>
                        </div>
                    </div>
                    <div className='inline-block bg-gray-200 m-3 p-3 rounded-md' >
                        Let me check...
                        <div className='flex justify-end'>
                            <span className='text-sm'>0 : 16</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <hr className="border-t border-gray-100 w-full" />
                        <button className="bg-black text-white px-3 py-1 rounded-full">
                            check_capacity
                        </button>
                        <hr className="border-t border-gray-100 w-full" />
                    </div>
                    <div className='m-2'>
                        <div className='' style={{ "color": "#8a8585" }}>
                            origin :&nbsp;
                            <span className='text-black'>
                                Laredo , Taxes
                            </span>
                        </div>
                        <div className='' style={{ "color": "#8a8585" }}>
                            date : &nbsp;
                            <span className='text-black'>
                                2024 1 16
                            </span>
                        </div>
                    </div>
                    <hr className="border-t border-gray-100 w-full" />
                    <div className='m-2'>
                        <div>
                            {origins && origins.map((origin, index) => (
                                <div key={index} className='' style={{ "color": "#8a8585" }}>
                                    {origin.type}:&nbsp;
                                    <span className='text-black'>{origin.location}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='inline-block  bg-gray-100 m-3 p-3 rounded-md' >Pellentesque habitant morbi tristique senectus et netus et
                        <div className='flex justify-end'>
                            <span className='text-sm'>0 : 12</span>
                        </div>
                    </div>
                    <div className='mx-3 mb-3'>
                        <ReactAudioPlayer
                            src="/audio.mp3"
                            autoPlay
                            controls
                        />
                    </div>
                </>
                    :
                    <div className='m-3'>
                        Select call log to view details
                    </div>}
            </section>
        </div >
    );
};

export default Calllog;