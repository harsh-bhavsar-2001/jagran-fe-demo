'use client';
import React, { useState } from "react";
import { useParams } from 'next/navigation'
import axios from 'axios';

import { TargetList } from "../../../constants/target";
import { authToken } from "../../../constants/token";

export default function BlogDetailLayout({ children }) {

  const [textValue, setTextValue] = useState("");
  const { slug } = useParams();

  const onCommentClick = () => {
    if (!textValue) {
      alert('Please Add some comment');
      return;
    }

    addComment();
  }

  async function addComment() {
    try {
      const url = `https://dev-api.jnm.digital/comment/api/v1/comment`;
      const headers = {
        Authorization: authToken,
        'X-Target': TargetList.JAGRAN_DEV
      }

      const body = {
        "comment_text": textValue,
        "comment_article_id": slug,
        "comment_user": {
          "type": "manual",
          "user_id": "8e9482388e4894d9w4",
          "user_name": "Mark",
          "user_email": "mark@gmail.com",
          "user_image": "https://images.herzindagi.info/image/2022/Aug/Samridhi-Breja.jpg"
        }
      }

      axios.post(url, body, { headers }).then(function (response) {
        setTextValue('');
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
      }).catch(function (error) {
        console.log(error);
      });
    } catch (err) {
      console.log(err)
    }

  }

  const changeHandler = (event) => {
    setTextValue(event?.target?.value);
  }

  return (
    <>
      {children}
      <script src="https://www.gstatic.com/charts/loader.js"></script>

      <link id="font-popins" rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap" />
      <link id="font-inconsolata" rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800;900&amp;display=swap" />
      <link id="font-mirza" rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Mirza:wght@400;500;600;700&amp;display=swap" />
      <link id="font-merriweather" rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&amp;display=swap" />

      {/* <header id="mainHeader" style={{ 'zIndex': '999' }}>

        <div className="Header_topStripContainer__XPz4A centered">
          <div className="Header_topStripContainer__language___nE1x"><a href="#">Language</a>
            <ul className="Header_topStripContainer__language__languageLink__YT0y6">
              <li><a target="_blank" className="active" href="/">हिन्दी</a></li>
              <li><a target="_blank" className="" href="https://english.jagran.com">English</a></li>
              <li><a target="_blank" className="" href="https://www.gujaratijagran.com">ગુજરાતી</a></li>
              <li><a target="_blank" className="" href="https://www.punjabijagran.com">ਪੰਜਾਬੀ</a></li>
            </ul>
          </div>
          <ul className="Header_topStripContainer__topLink__UmZmM">
            <li><a target="_blank" className="" href=" https://www.naidunia.com">Naidunia</a></li>
            <li><a target="_blank" className="" href="https://www.jagranjosh.com">Jagran Josh</a></li>
            <li><a target="_blank" className="" href="https://www.herzindagi.com">Her Zindagi</a></li>
            <li><a target="_blank" className="" href="https://www.onlymyhealth.com">Onlymyhealth</a></li>
            <li><a target="_blank" className="" href="https://www.vishvasnews.com">Vishvas News</a></li>
            <li><a target="_blank" className="" href="https://www.inextlive.com">Inextlive</a></li>
            <li><a target="_blank" className="" href="https://www.jagranplay.com">Jagran Play</a></li>
            <li><a target="_blank" className="" href="https://www.jagrantv.com">Jagran TV</a></li>
            <li><a target="_blank" className="" href="https://www.jagran.com/podcast">Podcast</a></li>
          </ul>
        </div>
        <div className="Header_header__headerMain__AMYOZ centered">
          <img className="header-image-new" src="https://storage.googleapis.com/dev-cms-backend-media/2023-08-10/template/image/1691651152603-aee72e92-e31e-43fa-a297-9f725f0ee3bb.png" />
        </div>
        <div className="centered mobilefull menuscroll">
          <div className="stickyads mobileAds">
            <div id="target-50" className="adsView"></div>
          </div>
          <div className="Header_header__mainMenu__ym_zz">
            <ul className="Header_header__menuPrimary___Ng4k menuPrimary">
              <li className="Header_primeImage__AN866"><a title="prime listing" href="/prime-news-hindi.html"><svg>
                <use href="/sprite.svg#primeimages"></use>
              </svg></a></li>
              <li><a href="/" className="" data_id="होम">होम</a></li>
              <li><a href="/latest-news.html?itm_medium=latest&amp;amp;itm_source=dsktp&amp;amp;itm_campaign=navigation"
                className="" data_id="ताज़ा">ताज़ा</a></li>
              <li><a href="/news/national-news-hindi.html?itm_medium=national&amp;amp;itm_source=dsktp&amp;amp;itm_campaign=navigation"
                className="" data_id="राष्ट्रीय">राष्ट्रीय</a></li>
              <li><a href="/feature-news-hindi.html" className="" data_id="एक्सप्लेनर">एक्सप्लेनर</a></li>
              <li><a href="/specials.html?itm_medium=specials&amp;itm_source=dsktp&amp;itm_campaign=navigation"
                className="" data_id="स्पेशल">स्पेशल</a></li>
              <li><a href="/markets-hindi.html?utm_source=top-nav&amp;utm_medium=sharemarket&amp;utm_campaign=5paisa"
                className="activenav" data_id="शेयर बाजार">शेयर बाजार</a></li>
              <li><a href="/politics-news-hindi.html?itm_medium=politics&amp;amp;itm_source=dsktp&amp;amp;itm_campaign=navigation"
                className="" data_id="पॉलिटिक्स">पॉलिटिक्स</a></li>
              <li><a href="/world-news-hindi.html?itm_medium=world&amp;amp;itm_source=dsktp&amp;amp;itm_campaign=navigation"
                className="" data_id="दुनिया">दुनिया</a></li>
              <li><a href="/entertainment-hindi.html?itm_medium=entertainment&amp;itm_source=dsktp&amp;itm_campaign=navigation"
                className="" data_id="मनोरंजन">मनोरंजन</a></li>
              <li><a href="/business-hindi.html?itm_medium=business&amp;itm_source=dsktp&amp;itm_campaign=navigation"
                className="" data_id="बिजनेस">बिजनेस</a></li>
              <li><a href="/cricket-hindi.html?itm_medium=cricket&amp;itm_source=dsktp&amp;itm_campaign=navigation"
                className="" data_id="क्रिकेट">क्रिकेट</a></li>
              <li className="undefined dropdown"><span className="moreBtn">MORE <svg>
                <use href="/sprite.svg#dotmenu"></use>
              </svg></span>
                <ul className="dropdownMenu menu Header_dropdownMenu__yE1Z4 undefined">
                  <li><a href="/lifestyle-hindi.html?itm_medium=lifestyle&amp;itm_source=dsktp&amp;itm_campaign=navigation"
                    className="" data_id="लाइफस्टाइल">लाइफस्टाइल</a></li>
                  <li><a href="/technology-hindi.html?itm_medium=tech&amp;itm_source=dsktp&amp;itm_campaign=navigation"
                    className="" data_id="टेक ज्ञान">टेक ज्ञान</a></li>
                  <li><a href="/spiritual-hindi.html?itm_medium=spiritual&amp;itm_source=dsktp&amp;itm_campaign=navigation"
                    className="" data_id="अध्यात्म">अध्यात्म</a></li>
                  <li><a href="/automobile?itm_medium=auto&amp;itm_source=dsktp&amp;itm_campaign=navigation"
                    className="" data_id="ऑटो">ऑटो</a></li>
                  <li><a href="/news/education-news-hindi.html?itm_medium=education&amp;itm_source=dsktp&amp;itm_campaign=navigation"
                    className="" data_id="शिक्षा">शिक्षा</a></li>
                  <li><a href="/jokes-hindi.html?itm_medium=jokes&amp;itm_source=dsktp&amp;itm_campaign=navigation"
                    className="" data_id="जोक्स">जोक्स</a></li>
                  <li><a href="/common-man-issue-news-hindi.html?itm_medium=cmi&amp;itm_source=dsktp&amp;itm_campaign=navigation"
                    className="" data_id="आम मुद्दे">आम मुद्दे</a></li>
                  <li><a href="/news/job-news-hindi.html?itm_medium=job&amp;itm_source=dsktp&amp;itm_campaign=navigation"
                    className="" data_id="जॉब्स">जॉब्स</a></li>
                  <li><a href="/news/career-news-hindi.html?itm_medium=career&amp;itm_source=dsktp&amp;itm_campaign=navigation"
                    className="" data_id="कैरियर">कैरियर</a></li>
                </ul>
              </li>
            </ul>
            <ul className="Header_header__rhsMenu__QzFiN"><a id="Prime_Subscribe" className="btn btn-primary"
              href="https://prime.jagran.com/subscription.html">Subscribe</a><a href="#" title="searchpopup"
                className="Header_header__search__ROsQj"><svg>
                  <use href="/sprite.svg#search"></use>
                </svg></a><a href="#" title="hamburger" className="Header_header__hamburger__Vinnx"><svg>
                  <use href="/sprite.svg#menu"></use>
                </svg></a></ul>
          </div>
        </div>

      </header>
      <div className="header-space"></div> */}

      {/* <!--  BLOF POST START --> */}
      {/* <div className="container">
        <div className="mainArticle">
          <div className="main-col mainArticle__left">
            {children}
          </div>

          <div className="mainArticle__right">
            <div data-cx_b9kw="" className="cx-text-module">

              <a id="cXLinkIdll4q80cz3ht2yvnh" href="https://www.jagran.com/cricket/headlines-kuldeep-yadav-and-tilak-varma-jumped-in-t20i-icc-ranking-tilak-varma-first-time-entered-in-rankings-t20i-23496927.html" className="cx-item cx-main" target="_top" title="WI के खिलाफ शानदार प्रदर्शन ने Tilak Varma को दिलाई ICC रैंकिंग में एंट्री, Kuldeep Yadav को भी मिला बड़ा इनाम">
                <h3>WI के खिलाफ शानदार प्रदर्शन ने Tilak Varma को दिलाई ICC रैंकिंग में एंट्री, Kuldeep Yadav को भी मिला बड़ा इनाम</h3>
              </a>

              <a id="cXLinkIdll4q80cziui913ox" href="https://www.jagran.com/cricket/apni-baat-world-cup-2023-not-team-india-r-ashwin-picks-australia-as-favourite-for-2023-world-cup-champion-23496370.html" className="cx-item cx-main" target="_top" title="R Ashwin ने की बड़ी भविष्‍यवाणी, कहा- ये टीम बनेगी World Cup 2023 की चैंपियन, टीम इंडिया को दिया झटका">
                <h3>R Ashwin ने की बड़ी भविष्‍यवाणी, कहा- ये टीम बनेगी World Cup 2023 की चैंपियन, टीम इंडिया को दिया झटका</h3>
              </a>

              <a id="cXLinkIdll4q80czg6wdogg6" href="https://www.jagran.com/cricket/headlines-conversation-between-hardik-pandya-and-tilak-varma-recorded-in-stump-mic-before-winning-six-in-3rd-t20i-23496582.html" className="cx-item cx-main" target="_top" title="जीत से पहले स्टंप माइक में रिकॉर्ड हुई Hardik और तिलक वर्मा की बातचीत, अब सोशल मीडिया पर तबाही मचा रहा वीडियो">
                <h3>जीत से पहले स्टंप माइक में रिकॉर्ड हुई Hardik और तिलक वर्मा की बातचीत, अब सोशल मीडिया पर तबाही मचा रहा वीडियो</h3>
              </a>

              <a id="cXLinkIdll4q80czaftg0bwj" href="https://www.jagran.com/uttar-pradesh/varanasi-city-gyanvapi-case-past-of-the-western-wall-was-reconstructed-from-3d-images-in-gyanvapi-virtual-photographs-were-prepared-23496092.html" className="cx-item cx-main" target="_top" title="Gyanvapi Case: ज्ञानवापी में थ्रीडी इमेज से खंगाला गया पश्चिमी दीवार का अतीत, आभासी तस्वीरें की गईं तैयार">
                <h3>Gyanvapi Case: ज्ञानवापी में थ्रीडी इमेज से खंगाला गया पश्चिमी दीवार का अतीत, आभासी तस्वीरें की गईं तैयार</h3>
              </a>

              <a id="cXLinkIdll4q80czi6zx2aen" href="https://www.jagran.com/business/biz-sebi-said-shares-of-companies-will-be-listed-in-just-3-days-after-ipo-23496690.html" className="cx-item cx-main" target="_top" title="IPO के बाद अब सिर्फ 3 दिनों में लिस्ट होंगे कंपनियों के शेयर, SEBI ने दिया बड़ा अपडेट">
                <h3>IPO के बाद अब सिर्फ 3 दिनों में लिस्ट होंगे कंपनियों के शेयर, SEBI ने दिया बड़ा अपडेट</h3>
              </a>

              <a id="cXLinkIdll4q80czewiyyq4l" href="https://www.jagran.com/uttar-pradesh/sitapur-mother-son-electrocuted-to-death-from-mobile-charger-in-sitapur-23495443.html" className="cx-item cx-main" target="_top" title="Sitapur: आधी रात में मौत के आगोश के समा गए मां-बेटे, मोबाइल का चार्जर बना वजह; हैरान कर देगी घटना">
                <h3>Sitapur: आधी रात में मौत के आगोश के समा गए मां-बेटे, मोबाइल का चार्जर बना वजह; हैरान कर देगी घटना</h3>
              </a>

            </div>
          </div>
        </div>
      </div> */}
      {/* <!--  BLOF POST END --> */}

      {/* <div className="GutterBox">
        <div className="GutterAdsLHS webAds advertiseTxt" style={{ zIndex: 9999 }}>
          <div id="target-20" className="adsView">
            <div id="details_lhs_160x600" data-google-query-id="COL_9ffH0YADFc72UQodeaMHaQ">
              <div
                className='advertisment-id'>
                <img src='https://storage.googleapis.com/dev-cms-backend-media/2023-08-10/template/image/1691657992031-a4074bb7-8350-4c4b-97cd-d2e6c447526e.jpeg' />
              </div>
            </div>
          </div>
        </div>
        <div className="GutterAdsRHS webAds advertiseTxt" style={{ zIndex: 9999 }}>
          <div id="target-21" className="adsView">
            <div id="details_rhs_160x600" data-google-query-id="CMLOivjH0YADFVbZ1Qod2DcIBg">
              <div
                className='advertisment-id'>

                <img src='https://storage.googleapis.com/dev-cms-backend-media/2023-08-10/template/image/1691657992031-a4074bb7-8350-4c4b-97cd-d2e6c447526e.jpeg' />

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="_15BTU container">
        <h3 className="aKzcH">Comments</h3>
        <form className="_2-Ckh" style={{ padding: "50px 0px" }}>
          <img src="https://fea.assettype.com/newslaundry/assets/avatar-0992404040319c0fbe2c.png" className="ZuZCG gm-observing gm-observing-cb" style={{ padding: "8px" }} />
          <textarea value={textValue} rows="1" onChange={changeHandler} placeholder="Enter comment" className="_1oA04"></textarea>
          <button type="button" onClick={onCommentClick} className="_1BtHB">Send</button>
        </form>
      </div> */}

      {/* <!-- FOOTER START --> */}
      {/* <footer>
        <img className='footer-new-image' src="https://storage.googleapis.com/dev-cms-backend-media/2023-08-10/template/image/1691651865544-5e133e03-e13d-47f1-8bef-132602de8be5.png"
        />
      </footer> */}

      {/* <div id="snackbar">Comment added succesfully</div> */}
      {/* <!-- FOOTER END --> */}
    </>
  )
}
