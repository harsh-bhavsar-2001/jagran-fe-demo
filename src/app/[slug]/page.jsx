"use client";

import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { Helmet } from "react-helmet";
// import Head from 'next/head';
// import  Head from "next/document";

const scriptsDemo = "<script id=\"line_chart\" src=\"https://www.gstatic.com/charts/loader.js\"></script><script id=\"line_chart\">var GOOGLE_CHART_LOADED = false;google.charts.load('current', { 'packages': ['barchart', 'piechart', 'linechart'] });google.charts.setOnLoadCallback(scriptLoaded);function  scriptLoaded() {GOOGLE_CHART_LOADED = true;}function drawChart(type = 'PieChart', id = 'piechart', chartData, options) {var data = google.visualization.arrayToDataTable(chartData);var chart = new google.visualization[type](document.getElementById(id));chart.draw(data, options); } function initChart(type, id, chartData, options) {drawChart(type, id, chartData, options)}</script><script id=\"waiting\">function waitForCondition(variable) {function waitFor(result) {if (result) {return result;}return new Promise((resolve) => setTimeout(resolve, 100)).then(() => Promise.resolve(window[variable])).then((res) => waitFor(res));}return waitFor();}</script><script id=\"line_chart\">waitForCondition('GOOGLE_CHART_LOADED').then((res) =>initChart('LineChart','line_chart_S63OEo',[[\"Amount\",\"Sales\",\"Expenses\"],[\"2004\",700,800],[\"2005\",300,900],[\"2006\",200,800],[\"2007\",900,500]],{\"title\":\"Company Performance\",\"display_data\":false,\"curveType\":\"function\",\"legend\":{\"position\":\"none\"},\"colors\":[\"#ff0000\",\"#00ff00\"],\"backgroundColor\":{\"strokeWidth\":0},\"hAxis\":{\"title\":\"Year\",\"minValue\":0,\"textStyle\":{\"bold\":true,\"fontSize\":12,\"color\":\"#4d4d4d\"},\"titleTextStyle\":{\"bold\":true,\"fontSize\":18,\"color\":\"#4d4d4d\"}},\"vAxis\":{\"title\":\"Amount\",\"textStyle\":{\"fontSize\":14,\"bold\":true,\"color\":\"#848484\"},\"titleTextStyle\":{\"fontSize\":14,\"bold\":true,\"color\":\"#848484\"}}}));</script><script id=\"line_chart\">waitForCondition('GOOGLE_CHART_LOADED').then((res) =>initChart('LineChart','line_chart_S63OEo',[[\"Amount\",\"Sales\",\"Expenses\"],[\"2004\",700,800],[\"2005\",300,900],[\"2006\",200,800],[\"2007\",900,500]],{\"title\":\"Company Performance\",\"display_data\":false,\"curveType\":\"function\",\"legend\":{\"position\":\"none\"},\"colors\":[\"#ff0000\",\"#00ff00\"],\"backgroundColor\":{\"strokeWidth\":0},\"hAxis\":{\"title\":\"Year\",\"minValue\":0,\"textStyle\":{\"bold\":true,\"fontSize\":12,\"color\":\"#4d4d4d\"},\"titleTextStyle\":{\"bold\":true,\"fontSize\":18,\"color\":\"#4d4d4d\"}},\"vAxis\":{\"title\":\"Amount\",\"textStyle\":{\"fontSize\":14,\"bold\":true,\"color\":\"#848484\"},\"titleTextStyle\":{\"fontSize\":14,\"bold\":true,\"color\":\"#848484\"}}}));</script>"

const BlogDetailPage = () => {

   const TargetList = {
      HINDI_JAGRAN: '616a9df6-9ffa-4a13-81d8-c65ea2f92d6b',
      ENGLISH_JAGRAN: '82d8e272-d6f2-4225-9629-4a4012a43e19',
      JAGRAN_TEST: 'a8ca2f19-2c5b-43c2-805e-8979101a3953',
      JAGRAN_DEV: 'd5867ee8-34b5-4923-87b4-a7ba35ceaa06'
   }

   const [demo, setDemo] = useState({ __html: `<div>Loading.....</div>` });
   const [script, setScript] = useState('')
   const [style, setStyle] = useState('')
   const [headLine, setHeadlines] = useState('')
   const [domLoaded, setDomLoaded] = useState(false);
   const { slug } = useParams();

   const scriptRef = useRef();
   const styleRef = useRef();
   const headlineRef = useRef();

   useEffect(() => {
      getArticleContent();
   }, [])

   useEffect(() => {
      loadScriptToPage();
   }, [scriptRef, script, styleRef, style, headLine, headlineRef])

   function loadScriptToPage() {
      if (scriptRef && scriptRef.current) {
         scriptRef.current.append(document?.createRange()?.createContextualFragment(script))
      }

      if (styleRef && styleRef.current) {
         console.log('==========',)
         styleRef.current.append(document?.createRange()?.createContextualFragment(style))
      }
   }

   // useEffect(() => {
   //    getArticleContent();
   // }, [domLoaded])

   function createLinks() {
      return (
         <span style={{ display: 'flex', gap: '40px' }}>
            {(() => {
               let td = [];
               for (let i = 0; i <= headLine.length; i++) {
                  td.push(<a href="haryana/mewat-ncr-court-granted-bail-of-congress-mla-maman-khan-in-nuh-violence-case-23546294.html" className="BigTitle_bigTitle__slider__ybWF3" key={i}>{headLine[i]}</a>);
               }
               return td;
            })()}
         </span>
      );
   }

   async function getArticleContent(url) {
      try {
         const url = `https://smart-cms-api.jnm.digital/content/api/v1/article/publish/${slug}/content?type=html`

         const headers = {
            Authorization: "Bearer " + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb2RlIjoieVh1V3d0anVVYk43RkQ1ZlZBdzRHeVRNNmNTYzlBIiwidXNlcl9pZCI6IjJhZDJhOGU2LWI3ZTYtNDczYy1hZTM3LTkxM2FhZjAzM2I2MSIsInVzZXJfZW1haWwiOiJxYUB5b3BtYWlsLmNvbSJ9.3pC9tfkPNrQHE1GDYKHVC-gnWViFTyUdALIbS34cV94',
            'X-Target': TargetList.JAGRAN_TEST
         }

         const res = await fetch(url, { headers, 'Access-Control-Allow-Origin': '*' })
         const resJson = await res.json()
         if (resJson.status == 200) {
            console.log(resJson.data);
            setTimeout(() => {
               setDemo({ __html: resJson.data?.articles?.html });
               setScript(resJson.data?.articles?.scripts);
               setStyle(resJson.data?.articles?.styles);
               setHeadlines(resJson.data?.breakingNews.map(news => news?.art_headline?.en))
               let inner = document.getElementsByTagName('head')[0].innerHTML;
               inner += resJson.data?.articles?.styles;
               document.getElementsByTagName('head')[0].innerHTML = inner;
            }, 300);
         } else {
            console.log("ERROR")
         }
      } catch (err) {
         console.log(err)
      }

   }

   return demo?.__html?.length > 200 ? (

      <div>
         {/* <Helmet>
            <link rel="stylesheet" href="https://unpkg.com/image-compare-viewer/dist/image-compare-viewer.min.css" type="text/css"></link>
            {script}
            <script id="pie_chart" src="https://www.gstatic.com/charts/loader.js"></script>
            <script id="pie_chart"> { `var GOOGLE_CHART_LOADED = false;console.log('=====google=====') google.charts.load('current', { 'packages': ['barchart', 'piechart', 'linechart'] });google.charts.setOnLoadCallback(scriptLoaded);function  scriptLoaded() {GOOGLE_CHART_LOADED = true;}function drawChart(type = 'PieChart', id = 'piechart', chartData, options) {var data = google.visualization.arrayToDataTable(chartData);var chart = new google.visualization[type](document.getElementById(id));chart.draw(data, options); } function initChart(type, id, chartData, options) {drawChart(type, id, chartData, options)}`}</script>
            <script id="pie_chart1">
               {
            `waitForCondition('GOOGLE_CHART_LOADED').then((res) =>initChart('PieChart','pie_chart_5cKGEd',[["Task","Hours Per Day"],["Work",11],["Eat",2],["Watch TV",5],["Sleep",7]],{"title":"Hours of the day","legend":{"position":"none"},"height":500,"backgroundColor":{"strokeWidth":0},"colors":["#ff0000","#0000ff","#00ff00","#9a53d5"]}));`
            }
            </script> 
         </Helmet> */}
         {headLine?.length ? <div className="BigTitle_bigTitle__XaFRd">
            <span className="BigTitle_bigTitle__title__rZp9D">
               <a href="https://www.jagran.com/">बड़ी खबर</a>
            </span>
            <div className="BigTitle_bigTitleswiper__dtUew">
               <div className="swiper swiper-initialized swiper-horizontal swiper-backface-hidden">
                  <div className="swiper-wrapper">
                     <div className="swiper-slide BigTitle_bigTitle__slide__KiV_S h3 swiper-slide-active" style={{ marginRight: '50px' }}>
                        <marquee style={{ display: 'flex', position: 'relative' }}>
                           {
                              createLinks()}
                           {/* <a style={{ display: 'flex', width: '100%'}} href="haryana/mewat-ncr-court-granted-bail-of-congress-mla-maman-khan-in-nuh-violence-case-23546294.html" class="BigTitle_bigTitle__slider__ybWF3">
                           नूंह हिंसा से जुड़े केस में मामन खान को कोर्ट से बड़ी राहत, कांग्रेस विधायक को मिली जमानत
                        </a> */}
                        </marquee>
                     </div>
                  </div>
               </div>
            </div>
         </div> : ''}
         {/* <marquee style={{ width: '50%', backgroundColor: 'red'}}> asdasdasd sadasdsadas dasdasdasdsa dsadsadsadas dasdsadsad sadsadsadsad sadasdsadsadasdsad sadsadsadsad asdsad sadsa dsadsad</marquee> */}
         <div dangerouslySetInnerHTML={demo}>

         </div>
         <div id='scripts' ref={scriptRef}></div>
      </div>
   ) : <div style={{ fontSize: '20px' }}>Loading...</div>
}

export default BlogDetailPage