import Head from 'next/head'
import Header from '../../../components/componentLibrary/header/header'
import Footer from '../../../components/componentLibrary/footer/footer'
import { useState } from 'react';

export default function Content(props) {

    const [class1, setClass1] = useState('');
    const [class2, setClass2] = useState('');
    const [padding, setPadding] = useState(props.padding ? props.padding : '0');
    const [headerHeight, setHeaderHeight] = useState(props.headerHeight ? props.headerHeight : 'min-h-[8vh]');
    const [contentHeight, setContentHeight] = useState(props.contentHeight ? props.contentHeight : 'min-h-[92vh]');

    if (props.centered && class1 === '') {
        setClass1('flex justify-center items-center');
    }

    if (props.centered && class2 === '') {
        setClass2('min-h-full flex flex-col justify-center items-center h-full w-full');
    }

    return (
        <>
        <Head>
            <title>{props.title ?? "No title"}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header height={headerHeight} />

        <div className={`${contentHeight} ${class1}`}>

            <div className={`content_wrapper p-${padding} ${class2}`}>

                {props.children}

            </div>

        </div>
        
        <Footer/>

        </>
    )
}

