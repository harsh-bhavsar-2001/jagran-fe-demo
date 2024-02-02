"use client";

import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { TargetList } from '../../../constants/target';

const SolrSlugPage = () => {

  const [data, setData] = useState({});

  const [demo, setDemo] = useState({ __html: `<div>Loading.....</div>` });

  const [fixScript, setFixScript] = useState('')
  const [style, setStyle] = useState('')

  const { solrSlug: slug } = useParams();

  const scriptRef = useRef();
  const styleRef = useRef();

  useEffect(() => {
    getArticleContent();
  }, [])

  useEffect(() => {
    loadStyleToPage();
  }, [style])

  useEffect(() => {
    loadScriptToPage();
  }, [fixScript])

  function loadStyleToPage() {
    if (styleRef && styleRef.current) styleRef.current.append(document?.createRange()?.createContextualFragment(style))
  }

  function loadScriptToPage() {
    if (scriptRef && scriptRef.current) scriptRef.current.append(document?.createRange()?.createContextualFragment(fixScript))
  }

  useEffect(() => {
    getArticleContent();
  }, [])


  async function getArticleContent(url) {
    try {
      // const url = `https://dev-api.jnm.digital/content/api/v1/article/publish/${slug}/content?type=design`
      const url = `https://dev-api.jnm.digital/content/api/v1/article/${slug}/solr?type=normal`

      const headers = {
        Authorization: "Bearer " + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb2RlIjoiMUxDaDJjeGw1bThtQWZUVE95QU1MZnJBTXMzbld4IiwidXNlcl9pZCI6IjI0NDRjZmU1LWE1ZGUtNGIzMS04NDMwLWU0NGU3ZjI3NDcyYSIsInVzZXJfZW1haWwiOiJmcm9udGVuZEB5b3BtYWlsLmNvbSIsInVzZXJfcm9sZSI6ImFkbWluIn0.Gdw0k94UNgrccGTmHLkVFVHg5nLdgEH4nRyHatD_mrs',
        'X-Target': TargetList.JAGRAN_DEV
      }

      const res = await fetch(url, { headers, 'Access-Control-Allow-Origin': '*' });
      const resJson = await res.json();

      if (resJson.status == 200) {
        console.log(resJson.data);
        setTimeout(() => {
          const json = resJson.data?.json;
          setData(json);
          setDemo({ __html: json?.body_t });
          setFixScript(json?.script_s);
          setStyle(json?.global_css_s);
        }, 300);
      } else {
        console.log("ERROR")
      }
    } catch (err) {
      console.log(err)
    }

  }

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


  return demo?.__html?.length > 200 ? (
    <>
      {/* <link rel="stylesheet" href="https://unpkg.com/image-compare-viewer/dist/image-compare-viewer.min.css" type="text/css" /> */}
      <style jsx global>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body  {
            font-family: Poppins,sans-serif;
          }
        `}
      </style>
      <div className="jg_m-article main-container">
        <div className="jg_breadcrumb-container">
          <ul className="jg_breadcrumb-ul">
            <li className="jg_breadcrumb-li"><a href="#">Home</a></li>
            {data?.web_category_ci ? <li className="jg_breadcrumb-li"><a href="#">{data?.web_category_ci}</a></li> : ''}
            {data?.web_subcategory_ci ? <li className="jg_breadcrumb-li"><a href="#">{data?.web_subcategory_ci}</a></li> : ''}
          </ul>
        </div>
        {data?.label_s ?
          <div className="jg_article-badge-container"><a href="#" className="jg_article-badge">{data?.label_s}</a></div>
          : ''}
        <h1 className="jg_main-title">{data?.english_headline_t}</h1>
        <p className="jg_main-desc" dangerouslySetInnerHTML={{ __html: data?.summary_t }}></p>
        <div className="jg_author">
          <div className="">
            By: <strong>{data?.author_byline_s || data?.author_eng_s}</strong>
          </div>
          <div className="">
            Edited By: <strong>{data?.author_byline_s || data?.author_eng_s}</strong></div>
          <div className="jg-d-flex jg-gap-10px">
            <div className="">
              Published: {new Date(data?.created_date_dt).toDateString()} {formatAMPM(new Date(data?.created_date_dt))} (IST)
            </div>
            <div className="">
              Updated: Published: {new Date(data?.modified_date_dt).toDateString()} {formatAMPM(new Date(data?.modified_date_dt))} (IST)
            </div>
          </div>
        </div>
        <div className="jg_main-image-container">
          <img src={data?.image_path_t} alt="" className="jg_main-image" />
          <div className="jg_main-image-caption" dangerouslySetInnerHTML={{ __html: data?.image_caption_t }}></div>
        </div>
        <div dangerouslySetInnerHTML={demo}></div>
        <div id='styles' ref={styleRef}></div>
        <div id='scripts' ref={scriptRef}></div>
      </div >
    </>
  ) : <div style={{ fontSize: '20px' }}>Loading...</div>
}

export default SolrSlugPage;