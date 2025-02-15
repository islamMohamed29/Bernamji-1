document.addEventListener("DOMContentLoaded", function () {
  const langToggle = document.querySelector(".nav-item .item-language");
  const logo = document.querySelector(".logo-container img");
  const lab1 = document.querySelector(".lab-titles .lab-1 img");
  const lab2 = document.querySelector(".lab-titles .lab-2 img");

  const resources = {
    en: {
      translation: {
        heroTitle1: "Towards a better life",
        heroTitle2: "& A Sustainable Future",
        heroDescription:
          "We work to achieve excellence in services and develop infrastructure for generations Coming.",
        moreButton: "More",
        program1: "Program - 1",
        program2: "Program - 2",
        about: "About honesy",
        services: "Services",
        mediaCenter: "Media Center",
        programs: "Programs",
        contact: "Contact us",
        request_soil_examination: "Request a soil examination report",
        laboratory_accreditation_request: "Laboratory accreditation request",
        request_sample_analysis: "Request sample analysis",
        request_approval_of_materials: "Request for approval of materials",
      },
    },
    ar: {
      translation: {
        heroTitle1: "نحو حياة أفضل",
        heroTitle2: "ومستقبل مستدام",
        heroDescription:
          "نعمل لتحقيق التميز في الخدمات وتطوير البنية التحتية للأجيال القادمة.",
        moreButton: "المزيد",
        program1: "برنامج - 1",
        program2: "برنامج - 2",
        about: "عن الأمانة",
        services: "الخدمات",
        mediaCenter: "المركز الإعلامي",
        programs: "البرامج",
        contact: "تواصل معنا",
        request_soil_examination: "طلب تقرير فحص التربة",
        laboratory_accreditation_request: "طلب اعتماد معمل",
        request_sample_analysis: "طلب تحليل عينة",
        request_approval_of_materials: "طلب الموافقة على المواد",
      },
    },
  };

  i18next.use(i18nextBrowserLanguageDetector).init(
    {
      resources: resources,
      fallbackLng: "en",
      debug: true,
    },
    function (err, t) {
      updateContent(i18next.language);
    }
  );

  function updateContent(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    logo.src = lang === "ar" ? "images/logo-ar.png" : "images/logo-en.png";
    lab1.src = lang === "ar" ? "images/lab-1-ar.png" : "images/lab-1-en.png";
    lab2.src = lang === "ar" ? "images/lab-2-ar.png" : "images/lab-2-en.png";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (
        element.childNodes.length === 1 &&
        element.childNodes[0].nodeType === Node.TEXT_NODE
      ) {
        element.textContent = i18next.t(key);
      } else {
        let textNode = Array.from(element.childNodes).find(
          (node) => node.nodeType === Node.TEXT_NODE
        );
        if (textNode) {
          textNode.textContent = i18next.t(key);
        } else {
          textNode = document.createTextNode(i18next.t(key));
          element.insertBefore(textNode, element.firstChild);
        }
      }
    });
  }

  window.changeLanguage = function () {
    const currentLang = i18next.language;
    const newLang = currentLang === "en" ? "ar" : "en";
    i18next.changeLanguage(newLang, (err, t) => {
      if (err) return console.log("something went wrong loading", err);
      updateContent(newLang);
    });
  };

  langToggle.onclick = changeLanguage;

  const savedLang = localStorage.getItem("language") || "en";
  i18next.changeLanguage(savedLang, (err, t) => {
    if (err) return console.log("ERR:", err);
    updateContent(savedLang);
  });
});
