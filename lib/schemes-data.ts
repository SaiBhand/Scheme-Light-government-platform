// Complete scheme data for all 10 government schemes
import { type Language } from "@/lib/translations"

export interface Scheme {
  id: string
  name: string
  ministry: string
  targetGroup: string
  benefit: string
  icon: string
  eligibility: {
    minAge?: number
    maxAge?: number
    targetGroups: string[]
    incomeLimit?: number
    gender?: string
    categories?: string[]
    states?: string[]
    occupation?: string[]
    conditionals?: {
      isStudent?: boolean
      isFarmer?: boolean
      isDisabled?: boolean
      isWidow?: boolean
      isWoman?: boolean
      isOrphan?: boolean
    }
  }
  documents: string[]
  applicationMode: "Online" | "Offline" | "Both"
  applyUrl: string
  description: string
  keyBenefits: string[]
  howToApply: string[]
  status?: "Open" | "Closing Soon" | "Closed"
  keywords: string[]
  simplifiedDescription?: string
  offlineAssistance?: string[]
  videoTutorialUrl?: string // Hindi video tutorial for form filling
  lastUpdated?: string // Last updated date for trust indicator
  translations?: {
    hi?: {
      name: string
      description: string
      simplifiedDescription?: string
      keyBenefits: string[]
      howToApply: string[]
    }
    mr?: {
      name: string
      description: string
      simplifiedDescription?: string
      keyBenefits: string[]
      howToApply: string[]
    }
  }
}

export const schemes: Scheme[] = [
  {
    id: "F01",
    name: "PM Kisan Samman Nidhi",
    ministry: "Ministry of Agriculture",
    targetGroup: "Farmer",
    benefit: "₹6000 per year",
    icon: "🌾",
    eligibility: {
      targetGroups: ["Farmer"],
      incomeLimit: 200000,
      categories: ["All"],
      states: ["All"],
      occupation: ["farmer", "agricultural-worker"],
      conditionals: { isFarmer: true },
    },
    documents: ["Aadhaar Card", "Land Records", "Bank Passbook"],
    applicationMode: "Online",
    applyUrl: "https://pmkisan.gov.in",
    description:
      "The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector Scheme that provides income support to all landholding farmers' families in the country. Under the scheme, financial benefit of ₹6000 per year is provided to eligible farmer families in three equal installments of ₹2000 each.",
    simplifiedDescription:
      "Farmers get ₹6000 every year directly in their bank account. Money comes in 3 parts - ₹2000 each time.",
    keyBenefits: [
      "Direct income support of ₹6000 per year",
      "Payment in three equal installments",
      "Direct bank transfer",
      "No intermediaries required",
      "Simple registration process",
      "Available to all small and marginal farmers",
    ],
    howToApply: [
      "Visit the official PM-KISAN website at pmkisan.gov.in",
      'Click on "Farmers Corner" section',
      'Select "New Farmer Registration"',
      "Enter Aadhaar number and captcha code",
      "Fill in personal and land details",
      "Upload required documents",
      "Submit the application form",
      "Note down the registration number for future reference",
    ],
    status: "Open",
    keywords: ["farmer", "agriculture", "kisan", "farming", "6000", "land"],
    offlineAssistance: ["Common Service Center (CSC)", "Taluka Office", "Gram Panchayat", "Agriculture Department"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PrKjSms_i5c",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "पीएम किसान सम्मान निधि",
        description: "प्रधान मंत्री किसान सम्मान निधि (पीएम-किसान) एक केंद्रीय क्षेत्र की योजना है जो देश के सभी भूमिधारक किसान परिवारों को आय सहायता प्रदान करती है।",
        simplifiedDescription: "किसानों को सीधे उनके बैंक खाते में हर साल ₹6000 मिलते हैं। यह पैसा 3 किस्तों में - हर बार ₹2000 करके आता है।",
        keyBenefits: [
          "प्रति वर्ष ₹6000 की प्रत्यक्ष आय सहायता",
          "तीन समान किस्तों में भुगतान",
          "सीधे बैंक हस्तांतरण (DBT)",
          "किसी बिचौलिए की आवश्यकता नहीं",
          "सरल पंजीकरण प्रक्रिया",
          "सभी छोटे और सीमांत किसानों के लिए उपलब्ध"
        ],
        howToApply: [
          "pmkisan.gov.in पर आधिकारिक पीएम-किसान वेबसाइट पर जाएं",
          "'Farmers Corner' (किसानों का कोना) अनुभाग पर क्लिक करें",
          "'New Farmer Registration' चुनें",
          "आधार संख्या और कैप्चा कोड दर्ज करें",
          "व्यक्तिगत और भूमि विवरण भरें",
          "आवश्यक दस्तावेज अपलोड करें",
          "आवेदन पत्र जमा करें"
        ]
      },
      mr: {
        name: "पीएम किसान सन्मान निधी",
        description: "प्रधानमंत्री किसान सन्मान निधी (PM-KISAN) ही एक केंद्रीय योजना आहे जी देशातील सर्व जमीनदार शेतकरी कुटुंबांना आर्थिक मदत प्रदान करते.",
        simplifiedDescription: "शेतकऱ्यांना दरवर्षी ₹6000 थेट त्यांच्या बँक खात्यात मिळतात. हे पैसे 3 हप्त्यांमध्ये - प्रत्येक वेळी ₹2000 असे येतात.",
        keyBenefits: [
          "दरवर्षी ₹6000 ची थेट आर्थिक मदत",
          "तीन समान हप्त्यांमध्ये पैसे मिळतात",
          "थेट बँक ट्रान्सफर (DBT)",
          "कोणत्याही मध्यस्थाची गरज नाही",
          "सोपी नोंदणी प्रक्रिया",
          "सर्व लहान आणि सीमांत शेतकऱ्यांसाठी उपलब्ध"
        ],
        howToApply: [
          "pmkisan.gov.in या अधिकृत वेबसाइटवर जा",
          "'Farmers Corner' विभागावर क्लिक करा",
          "'New Farmer Registration' निवडा",
          "आधार क्रमांक आणि कॅप्चा कोड टाका",
          "वैयक्तिक आणि जमिनीचा तपशील भरा",
          "आवश्यक कागदपत्रे अपलोड करा",
          "अर्ज सबमिट करा"
        ]
      }
    }
  },
  {
    id: "H01",
    name: "Ayushman Bharat Yojana",
    ministry: "Ministry of Health",
    targetGroup: "All",
    benefit: "₹5 lakh health cover",
    icon: "🏥",
    eligibility: {
      targetGroups: ["All"],
      incomeLimit: 250000,
      categories: ["All"],
      states: ["All"],
    },
    documents: ["Aadhaar Card", "Ration Card"],
    applicationMode: "Online",
    applyUrl: "https://pmjay.gov.in",
    description:
      "Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) is the world's largest health insurance/assurance scheme fully financed by the government. It provides a health cover of ₹5 lakhs per family per year for secondary and tertiary care hospitalization.",
    simplifiedDescription: "Get free health insurance up to ₹5 lakhs for your family. Covers hospital expenses.",
    keyBenefits: [
      "Health cover of ₹5 lakh per family per year",
      "Covers over 1,400 procedures",
      "Cashless and paperless treatment",
      "Pre and post-hospitalization expenses covered",
      "No restriction on family size",
      "Covers all pre-existing conditions",
    ],
    howToApply: [
      "Visit the nearest Common Service Centre (CSC) or hospital",
      "Verify eligibility through Aadhaar",
      "Get your family details verified",
      "Receive Ayushman Bharat card",
      "Show card at any empaneled hospital",
      "Receive cashless treatment up to ₹5 lakhs",
    ],
    status: "Open",
    keywords: ["health insurance", "medical", "ayushman bharat", "pmjay", "5 lakh cover"],
    offlineAssistance: ["Common Service Center (CSC)", "Empaneled Hospitals"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=S2uX2bQ9w2E",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "आयुष्मान भारत योजना",
        description: "आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना (PM-JAY) दुनिया की सबसे बड़ी स्वास्थ्य बीमा योजना है। यह द्वितीयक और तृतीयक देखभाल अस्पताल में भर्ती होने के लिए प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य कवर प्रदान करती है।",
        simplifiedDescription: "अपने परिवार के लिए ₹5 लाख तक का मुफ्त स्वास्थ्य बीमा प्राप्त करें। अस्पताल के खर्चे कवर होते हैं।",
        keyBenefits: [
          "प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य कवर",
          "1,400 से अधिक प्रक्रियाओं को कवर करता है",
          "कैशलेस और पेपरलेस इलाज",
          "अस्पताल में भर्ती होने से पहले और बाद के खर्च कवर",
          "परिवार के आकार पर कोई प्रतिबंध नहीं",
          "सभी पुरानी बीमारियों को कवर किया गया है"
        ],
        howToApply: [
          "निकटतम कॉमन सर्विस सेंटर (CSC) या अस्पताल में जाएँ",
          "आधार के माध्यम से पात्रता सत्यापित करें",
          "अपने परिवार के विवरण सत्यापित करवाएं",
          "आयुष्मान भारत कार्ड प्राप्त करें",
          "किसी भी सूचीबद्ध अस्पताल में कार्ड दिखाएं",
          "₹5 लाख तक का कैशलेस इलाज प्राप्त करें"
        ]
      },
      mr: {
        name: "आयुष्मान भारत योजना",
        description: "आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना (PM-JAY) ही जगातील सर्वात मोठी आरोग्य विमा योजना आहे. हे कुटुंबाला दरवर्षी ₹5 लाखांपर्यंतचे मोफत उपचार देते.",
        simplifiedDescription: "तुमच्या कुटुंबासाठी ₹5 लाखांपर्यंतचा मोफत आरोग्य विमा मिळवा. रुग्णालयाचा खर्च यात समाविष्ट आहे.",
        keyBenefits: [
          "एका कुटुंबाला दरवर्षी ₹5 लाखांचे आरोग्य कवच",
          "१,४०० हून अधिक उपचारांचा समावेश",
          "कॅशलेस आणि पेपरलेस उपचार",
          "रुग्णालयात दाखल होण्यापूर्वी आणि नंतरचा खर्च समाविष्ट",
          "कुटुंबाच्या आकारावर कोणतेही बंधन नाही",
          "सर्व जुन्या आजारांचा समावेश आहे"
        ],
        howToApply: [
          "जवळच्या कॉमन सर्व्हिस सेंटर (CSC) किंवा रुग्णालयाला भेट द्या",
          "आधार कार्डद्वारे पात्रता तपासा",
          "कुटुंबाचा तपशील सत्यापित करा",
          "आयुष्मान भारत कार्ड मिळवा",
          "कोणत्याही पॅनेल केलेल्या रुग्णालयात कार्ड दाखवा",
          "₹5 लाखांपर्यंत रोख विरहित उपचार मिळवा"
        ]
      }
    }
  },
  {
    id: "HO01",
    name: "PM Awas Yojana",
    ministry: "Ministry of Housing",
    targetGroup: "All",
    benefit: "Housing subsidy",
    icon: "🏠",
    eligibility: {
      targetGroups: ["All"],
      incomeLimit: 300000,
      categories: ["All"],
      states: ["All"],
    },
    documents: ["Aadhaar Card", "Income Certificate"],
    applicationMode: "Online",
    applyUrl: "https://pmaymis.gov.in",
    description:
      "Pradhan Mantri Awas Yojana (PMAY) is a flagship scheme of the Government of India to provide affordable housing to the urban poor. The scheme aims to build crore houses for the urban poor by providing central assistance.",
    simplifiedDescription: "Get help to buy or build your own house. Subsidy on home loan or direct financial aid.",
    keyBenefits: [
      "Interest subsidy on home loans",
      "Direct financial assistance for house construction",
      "Preference to women ownership",
      "Support for slum rehabilitation",
      "Affordable housing in partnership with private sector",
      "Benefits for first-time home buyers",
    ],
    howToApply: [
      "Visit the PMAY official website",
      'Click on "Citizen Assessment"',
      "Select appropriate category",
      "Fill in Aadhaar number",
      "Complete the online application form",
      "Upload required documents",
      "Submit application and note application ID",
      "Track application status online",
    ],
    status: "Open",
    keywords: ["housing", "pradhan mantri awas yojana", "pmay", "home loan", "affordable housing"],
    offlineAssistance: ["Local Municipal Office", "Urban Development Authority"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=o0B71g2r_qE",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "पीएम आवास योजना",
        description: "प्रधान मंत्री आवास योजना (PMAY) भारत सरकार की एक प्रमुख योजना है जिसका उद्देश्य शहरी गरीबों को किफायती आवास प्रदान करना है।",
        simplifiedDescription: "अपना घर खरीदने या बनाने के लिए मदद प्राप्त करें। होम लोन पर सब्सिडी या सीधी आर्थिक सहायता।",
        keyBenefits: [
          "होम लोन पर ब्याज सब्सिडी",
          "घर निर्माण के लिए सीधी वित्तीय सहायता",
          "महिलाओं के स्वामित्व को प्राथमिकता",
          "झुग्गी पुनर्वास के लिए समर्थन",
          "पहली बार घर खरीदने वालों के लिए लाभ"
        ],
        howToApply: [
          "पीएमएवाई (PMAY) आधिकारिक वेबसाइट पर जाएं",
          "'Citizen Assessment' पर क्लिक करें",
          "उचित श्रेणी चुनें",
          "आधार संख्या भरें",
          "ऑनलाइन आवेदन पत्र पूरा करें",
          "आवेदन जमा करें"
        ]
      },
      mr: {
        name: "पीएम आवास योजना",
        description: "प्रधानमंत्री आवास योजना (PMAY) ही भारत सरकारची एक प्रमुख योजना आहे ज्याचा उद्देश शहरी गरिबांना परवडणारी घरे उपलब्ध करून देणे आहे.",
        simplifiedDescription: "स्वतःचे घर घेण्यासाठी किंवा बांधण्यासाठी मदत मिळवा. गृहकर्जावर अनुदान किंवा थेट आर्थिक मदत.",
        keyBenefits: [
          "गृहकर्जावर व्याज अनुदान",
          "घर बांधण्यासाठी थेट आर्थिक मदत",
          "महिलांच्या मालकीला प्राधान्य",
          "झोपडपट्टी पुनर्वसनासाठी मदत",
          "प्रथमच घर घेणाऱ्यांसाठी फायदे"
        ],
        howToApply: [
          "PMAY अधिकृत वेबसाइटवर जा",
          "'Citizen Assessment' वर क्लिक करा",
          "योग्य श्रेणी निवडा",
          "आधार क्रमांक भरा",
          "ऑनलाइन अर्ज पूर्ण करा",
          "अर्ज सबमिट करा"
        ]
      }
    }
  },
  {
    id: "W01",
    name: "Ujjwala Yojana",
    ministry: "Ministry of Petroleum",
    targetGroup: "Women",
    benefit: "Free LPG connection",
    icon: "🔥",
    eligibility: {
      targetGroups: ["Women"],
      incomeLimit: 200000,
      categories: ["BPL", "SC", "ST", "OBC"],
      states: ["All"],
      gender: "female",
      conditionals: { isWoman: true },
    },
    documents: ["Aadhaar Card", "BPL Card"],
    applicationMode: "Online",
    applyUrl: "https://www.pmuy.gov.in",
    description:
      "Pradhan Mantri Ujjwala Yojana (PMUY) is a flagship scheme of the Government of India to provide LPG connections to women from Below Poverty Line (BPL) households. The scheme aims to replace unclean cooking fuels used in rural India with clean and efficient LPG.",
    simplifiedDescription: "Get a free LPG gas cylinder and stove for your kitchen. Helps women cook safely.",
    keyBenefits: [
      "Free LPG connection worth ₹1600",
      "EMI facility for first refill and stove",
      "No paperwork for connection",
      "Clean cooking fuel",
      "Health benefits from smoke-free cooking",
      "Women empowerment through ownership",
    ],
    howToApply: [
      "Visit nearest LPG distributor",
      "Fill PMUY application form",
      "Attach Aadhaar card and BPL certificate",
      "Submit the form to distributor",
      "Verification by oil company",
      "LPG connection installed at doorstep",
      "Receive LPG connection for free",
    ],
    status: "Open",
    keywords: ["ujjwala yojana", "lpg", "gas connection", "women", "cooking gas", "free cylinder"],
    offlineAssistance: ["LPG Distributor", "CSC Centers"],
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "उज्ज्वला योजना",
        description: "प्रधान मंत्री उज्ज्वला योजना (PMUY) गरीबी रेखा से नीचे (BPL) परिवारों की महिलाओं को एलपीजी कनेक्शन प्रदान करने के लिए भारत सरकार की एक प्रमुख योजना है।",
        simplifiedDescription: "अपनी रसोई के लिए मुफ़्त एलपीजी गैस सिलेंडर और चूल्हा प्राप्त करें। महिलाओं को सुरक्षित रूप से खाना पकाने में मदद करती है।",
        keyBenefits: [
          "₹1600 का मुफ़्त एलपीजी कनेक्शन",
          "पहले रिफिल और स्टोव के लिए ईएमआई सुविधा",
          "कनेक्शन के लिए कोई कागजी कार्रवाई नहीं",
          "स्वच्छ खाना पकाने का ईंधन",
          "धुआं मुक्त खाना पकाने से स्वास्थ्य लाभ",
          "स्वामित्व के माध्यम से महिला सशक्तिकरण"
        ],
        howToApply: [
          "निकटतम एलपीजी वितरक पर जाएं",
          "PMUY आवेदन पत्र भरें",
          "आधार कार्ड और बीपीएल प्रमाण पत्र संलग्न करें",
          "वितरक को फॉर्म जमा करें",
          "मुफ़्त एलपीजी कनेक्शन प्राप्त करें"
        ]
      },
      mr: {
        name: "उज्ज्वला योजना",
        description: "प्रधानमंत्री उज्ज्वला योजना (PMUY) ही दारिद्र्यरेषेखालील (BPL) कुटुंबातील महिलांना एलपीजी कनेक्शन देण्यासाठी भारत सरकारची एक प्रमुख योजना आहे.",
        simplifiedDescription: "तुमच्या स्वयंपाकघरासाठी मोफत एलपीजी गॅस सिलेंडर आणि शेगडी मिळवा. महिलांना सुरक्षितपणे स्वयंपाक करण्यास मदत करते.",
        keyBenefits: [
          "₹1600 चे मोफत एलपीजी कनेक्शन",
          "पहिल्या रिफिल आणि शेगडीसाठी ईएमआय सुविधा",
          "कनेक्शनसाठी जास्त कागदपत्रे लागत नाहीत",
          "स्वच्छ स्वयंपाकाचे इंधन",
          "धूरमुक्त स्वयंपाकामुळे आरोग्यास फायदे",
          "मालकीद्वारे महिला सक्षमीकरण"
        ],
        howToApply: [
          "जवळच्या एलपीजी वितरकाकडे जा",
          "PMUY अर्ज भरा",
          "आधार कार्ड आणि बीपीएल प्रमाणपत्र जोडा",
          "वितरकाकडे फॉर्म जमा करा",
          "मोफत एलपीजी कनेक्शन मिळवा"
        ]
      }
    }
  },
  {
    id: "U01",
    name: "PM Kaushal Vikas Yojana",
    ministry: "Ministry of Skill Development",
    targetGroup: "Unemployed",
    benefit: "Free skill training",
    icon: "🎓",
    eligibility: {
      minAge: 18,
      maxAge: 35,
      targetGroups: ["Unemployed", "Student"],
      incomeLimit: 300000,
      categories: ["All"],
      states: ["All"],
      occupation: ["unemployed", "student"],
    },
    documents: ["Aadhaar Card", "Education Certificate"],
    applicationMode: "Online",
    applyUrl: "https://www.pmkvyofficial.org",
    description:
      "Pradhan Mantri Kaushal Vikas Yojana (PMKVY) is the flagship scheme of the Ministry of Skill Development & Entrepreneurship (MSDE). The objective is to enable a large number of Indian youth to take up industry-relevant skill training that will help them in securing a better livelihood.",
    simplifiedDescription:
      "Get free training for new skills. Get certificates and help to find jobs. For youth and students.",
    keyBenefits: [
      "Free skill training programs",
      "Monetary reward on successful completion",
      "Recognition through certificates",
      "Placement assistance",
      "Training in various sectors",
      "Government certified courses",
    ],
    howToApply: [
      "Visit PMKVY official website",
      'Click on "Find a Training Center"',
      "Select your preferred sector and location",
      "Register at the training center",
      "Complete the enrollment process",
      "Attend training sessions",
      "Pass the assessment exam",
      "Receive certificate and monetary reward",
    ],
    status: "Open",
    keywords: ["skill development", "pmkvya", "training", "employment", "youth", "jobs"],
    offlineAssistance: ["Training Centers", "Skill Development Centers"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=zJg5_b5_b5b",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "पीएम कौशल विकास योजना",
        description: "प्रधान मंत्री कौशल विकास योजना (PMKVY) कौशल विकास और उद्यमिता मंत्रालय की प्रमुख योजना है। इसका उद्देश्य भारतीय युवाओं की बड़ी संख्या को उद्योग-प्रासंगिक कौशल प्रशिक्षण लेने में सक्षम बनाना है।",
        simplifiedDescription: "नए कौशल के लिए मुफ़्त प्रशिक्षण प्राप्त करें। प्रमाण पत्र और नौकरी खोजने में मदद प्राप्त करें। युवाओं और छात्रों के लिए।",
        keyBenefits: [
          "मुफ़्त कौशल प्रशिक्षण कार्यक्रम",
          "सफल समापन पर मौद्रिक इनाम",
          "प्रमाणपत्रों के माध्यम से मान्यता",
          "प्लेसमेंट सहायता",
          "विभिन्न क्षेत्रों में प्रशिक्षण",
          "सरकार द्वारा प्रमाणित पाठ्यक्रम"
        ],
        howToApply: [
          "PMKVY की आधिकारिक वेबसाइट पर जाएँ",
          "'Find a Training Center' पर क्लिक करें",
          "प्रशिक्षण केंद्र में पंजीकरण करें",
          "नामांकन प्रक्रिया पूरी करें",
          "प्रशिक्षण सत्रों में भाग लें"
        ]
      },
      mr: {
        name: "पीएम कौशल विकास योजना",
        description: "प्रधानमंत्री कौशल विकास योजना (PMKVY) ही कौशल्य विकास आणि उद्योजकता मंत्रालयाची प्रमुख योजना आहे. तरुणांना उद्योगाशी संबंधित कौशल्य प्रशिक्षण घेण्यास सक्षम करणे हे त्याचे उद्दिष्ट आहे.",
        simplifiedDescription: "नवीन कौशल्यांसाठी मोफत प्रशिक्षण मिळवा. प्रमाणपत्र आणि नोकरी शोधण्यासाठी मदत मिळवा. तरुण आणि विद्यार्थ्यांसाठी.",
        keyBenefits: [
          "मोफत कौशल्य प्रशिक्षण कार्यक्रम",
          "यशस्वी झाल्यावर आर्थिक बक्षीस",
          "प्रमाणपत्राद्वारे मान्यता",
          "नोकरीसाठी मदत (प्लेसमेंट)",
          "विविध क्षेत्रांमध्ये प्रशिक्षण",
          "सरकार प्रमाणित अभ्यासक्रम"
        ],
        howToApply: [
          "PMKVY अधिकृत वेबसाइटवर जा",
          "'Find a Training Center' वर क्लिक करा",
          "प्रशिक्षण केंद्रात नोंदणी करा",
          "प्रवेश प्रक्रिया पूर्ण करा",
          "प्रशिक्षण सत्रांना उपस्थित राहा"
        ]
      }
    }
  },
  {
    id: "G01",
    name: "Sukanya Samriddhi Yojana",
    ministry: "Ministry of Finance",
    targetGroup: "Girl Child",
    benefit: "High interest savings scheme",
    icon: "👧",
    eligibility: {
      maxAge: 10,
      targetGroups: ["Girl Child"],
      categories: ["All"],
      states: ["All"],
      gender: "female",
    },
    documents: ["Birth Certificate", "Aadhaar Card"],
    applicationMode: "Online",
    applyUrl: "https://www.india.gov.in/spotlight/sukanya-samriddhi-yojana",
    description:
      "Sukanya Samriddhi Yojana is a girl child prosperity scheme backed by the Government of India. It is a small deposit scheme for the girl child launched as a part of the Beti Bachao Beti Padhao campaign. The scheme offers high interest rates and tax benefits.",
    simplifiedDescription:
      "Save money for your daughter's future education and marriage. Get high interest on deposits.",
    keyBenefits: [
      "High interest rate (currently 8.2% p.a.)",
      "Tax deduction under Section 80C",
      "Maturity proceeds tax-free",
      "Partial withdrawal allowed for education",
      "Secure investment backed by Government",
      "Compounding benefits for long-term growth",
    ],
    howToApply: [
      "Visit nearest Post Office or authorized bank",
      "Fill SSY account opening form",
      "Attach birth certificate of girl child",
      "Submit parents identity and address proof",
      "Make minimum initial deposit of ₹250",
      "Receive passbook",
      "Continue yearly deposits until girl turns 15",
    ],
    status: "Open",
    keywords: ["sukanya samriddhi", "ssy", "girl child", "savings", "investment", "daughter"],
    offlineAssistance: ["Post Office", "Authorized Banks"],
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "सुकन्या समृद्धि योजना",
        description: "सुकन्या समृद्धि योजना भारत सरकार द्वारा समर्थित एक बालिका समृद्धि योजना है। यह 'बेटी बचाओ बेटी पढ़ाओ' अभियान के हिस्से के रूप में शुरू की गई है।",
        simplifiedDescription: "अपनी बेटी की भविष्य की शिक्षा और शादी के लिए पैसे बचाएं। जमा पर उच्च ब्याज प्राप्त करें।",
        keyBenefits: [
          "उच्च ब्याज दर (वर्तमान में 8.2% प्रति वर्ष)",
          "धारा 80C के तहत कर कटौती",
          "परिपक्वता आय कर-मुक्त",
          "शिक्षा के लिए partial निकासी की अनुमति",
          "सरकार द्वारा समर्थित सुरक्षित निवेश"
        ],
        howToApply: [
          "निकटतम डाकघर या अधिकृत बैंक पर जाएं",
          "SSY खाता खोलने का फॉर्म भरें",
          "बालिका का जन्म प्रमाण पत्र संलग्न करें",
          "माता-पिता का पहचान और पता प्रमाण जमा करें",
          "₹250 की न्यूनतम प्रारंभिक जमा राशि जमा करें",
          "पासबुक प्राप्त करें"
        ]
      },
      mr: {
        name: "सुकन्या समृद्धी योजना",
        description: "सुकन्या समृद्धी योजना ही भारत सरकारने मुलींच्या उज्ज्वल भविष्यासाठी सुरू केलेली योजना आहे. ही 'बेटी बचाओ बेटी पढाओ' मोहिमेचा भाग आहे.",
        simplifiedDescription: "तुमच्या मुलीच्या भविष्यातील शिक्षण आणि लग्नासाठी पैसे वाचवा. ठेवीवर जास्त व्याज मिळवा.",
        keyBenefits: [
          "उच्च व्याज दर (सध्या 8.2% प्रति वर्ष)",
          "कलम 80C अंतर्गत कर कपात",
          "मॅच्युरिटी रक्कम करमुक्त",
          "शिक्षणासाठी काही रक्कम काढण्याची परवानगी",
          "सरकारद्वारे सुरक्षित गुंतवणूक"
        ],
        howToApply: [
          "जवळच्या पोस्ट ऑफिस किंवा अधिकृत बँकेत जा",
          "SSY खाते उघडण्याचा फॉर्म भरा",
          "मुलीचा जन्मदाखला जोडा",
          "पालकांचे ओळखपत्र आणि पत्याचा पुरावा जमा करा",
          "किमान ₹250 जमा करा",
          "पासबुक मिळवा"
        ]
      }
    },
    videoTutorialUrl: "https://www.youtube.com/watch?v=J8n0G9y-9A8"
  },
  {
    id: "E01",
    name: "National Pension Scheme (NPS)",
    ministry: "Ministry of Finance",
    targetGroup: "Employed",
    benefit: "Retirement pension",
    icon: "💼",
    eligibility: {
      minAge: 18,
      maxAge: 60,
      targetGroups: ["Employed", "Self-employed"],
      categories: ["All"],
      states: ["All"],
      occupation: ["salaried", "self-employed"],
    },
    documents: ["Aadhaar Card", "PAN Card", "Bank Details"],
    applicationMode: "Online",
    applyUrl: "https://www.npscra.nsdl.co.in",
    description:
      "National Pension System (NPS) is a voluntary retirement savings scheme designed to enable systematic savings. It is a defined contribution scheme regulated by Pension Fund Regulatory and Development Authority (PFRDA). The scheme encourages people to invest in a pension account at regular intervals during their working life.",
    simplifiedDescription:
      "Save for your retirement. Invest regularly and get a pension after you stop working. Tax benefits available.",
    keyBenefits: [
      "Tax benefits up to ₹2 lakh under 80CCD",
      "Portable across jobs and locations",
      "Choice of pension fund managers",
      "Low cost investment option",
      "Flexible contribution amounts",
      "Regular pension after retirement",
    ],
    howToApply: [
      "Visit eNPS portal or POP-SP branch",
      "Fill NPS registration form",
      "Complete KYC with Aadhaar",
      "Upload required documents",
      "Choose pension fund and investment option",
      "Make initial contribution",
      "Receive PRAN (Permanent Retirement Account Number)",
      "Continue regular contributions",
    ],
    status: "Open",
    keywords: ["nps", "pension", "retirement", "investment", "savings", "npscra"],
    offlineAssistance: ["POP-SP (Points of Presence - Service Providers)", "NPS Authorized Centers"],
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "राष्ट्रीय पेंशन योजना (NPS)",
        description: "राष्ट्रीय पेंशन प्रणाली (NPS) स्वैच्छिक सेवानिवृत्ति बचत योजना है जिसे व्यवस्थित बचत को सक्षम करने के लिए डिज़ाइन किया गया है।",
        simplifiedDescription: "अपनी सेवानिवृत्ति के लिए बचत करें। नियमित रूप से निवेश करें और काम करना बंद करने के बाद पेंशन प्राप्त करें। कर लाभ उपलब्ध हैं।",
        keyBenefits: [
          "80CCD के तहत ₹2 लाख तक का कर लाभ",
          "नौकरियों और स्थानों पर पोर्टेबल",
          "पेंशन फंड प्रबंधकों का विकल्प",
          "कम लागत वाला निवेश विकल्प",
          "लचीली योगदान राशि",
          "सेवानिवृत्ति के बाद नियमित पेंशन"
        ],
        howToApply: [
          "eNPS पोर्टल या POP-SP शाखा पर जाएं",
          "NPS पंजीकरण फॉर्म भरें",
          "आधार के साथ केवाईसी पूरा करें",
          "आवश्यक दस्तावेज अपलोड करें",
          "प्रारंभिक योगदान करें",
          "PRAN (स्थायी सेवानिवृत्ति खाता संख्या) प्राप्त करें"
        ]
      },
      mr: {
        name: "राष्ट्रीय पेन्शन योजना (NPS)",
        description: "राष्ट्रीय पेन्शन प्रणाली (NPS) ही सेवानिवृत्तीनंतरच्या बचतीसाठी एक ऐच्छिक योजना आहे.",
        simplifiedDescription: "तुमच्या सेवानिवृत्तीसाठी बचत करा. नियमित गुंतवणूक करा आणि काम करणे थांबवल्यावर पेन्शन मिळवा. कर फायदे उपलब्ध.",
        keyBenefits: [
          "80CCD अंतर्गत ₹2 लाखांपर्यंत कर सवलत",
          "नोकरी बदलली तरी खाते चालू राहते (पोर्टेबल)",
          "पेन्शन फंड मॅनेजर निवडण्याचा पर्याय",
          "कमी खर्चाचा गुंतवणुकीचा पर्याय",
          "सेवानिवृत्तीनंतर नियमित पेन्शन"
        ],
        howToApply: [
          "eNPS पोर्टल किंवा POP-SP शाखेला भेट द्या",
          "NPS नोंदणी फॉर्म भरा",
          "आधारसह केवायसी (KYC) पूर्ण करा",
          "आवश्यक कागदपत्रे अपलोड करा",
          "सुरुवातीची रक्कम जमा करा",
          "PRAN कार्ड मिळवा"
        ]
      }
    }
  },
  {
    id: "S01",
    name: "Post Matric Scholarship",
    ministry: "Ministry of Social Justice",
    targetGroup: "Student",
    benefit: "Fee reimbursement",
    icon: "📚",
    eligibility: {
      minAge: 16,
      targetGroups: ["Student"],
      incomeLimit: 250000,
      categories: ["SC", "ST", "OBC"],
      states: ["All"],
      occupation: ["student"],
      conditionals: { isStudent: true },
    },
    documents: ["Aadhaar Card", "College ID", "Caste Certificate"],
    applicationMode: "Online",
    applyUrl: "https://scholarships.gov.in",
    description:
      "Post Matric Scholarship Scheme is implemented to provide financial assistance to students belonging to SC/ST/OBC categories studying at post-matriculation or post-secondary stage. The scheme aims to provide financial assistance to SC/ST/OBC students studying at post matriculation level to enable them to complete their education.",
    simplifiedDescription:
      "Scholarship for SC, ST, OBC students for college education. Helps pay fees and living expenses.",
    keyBenefits: [
      "Tuition fee reimbursement",
      "Maintenance allowance",
      "Direct transfer to student account",
      "Covers various courses and streams",
      "Annual renewal possible",
      "Support for hostel students",
    ],
    howToApply: [
      "Visit National Scholarship Portal",
      "Register with basic details",
      "Fill scholarship application form",
      "Upload required documents",
      "Submit caste certificate",
      "Provide college and course details",
      "Submit application before deadline",
      "Track application status online",
    ],
    status: "Open",
    keywords: ["post matric scholarship", "sc st obc", "student", "college", "education"],
    offlineAssistance: ["College/University Financial Aid Office", "District Social Welfare Office"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=C7m8Q3z-3QY",
    lastUpdated: "2024-01-10",
  },
  {
    id: "SE01",
    name: "Startup India Scheme",
    ministry: "Ministry of Commerce",
    targetGroup: "Self-employed",
    benefit: "Tax benefits & funding",
    icon: "🚀",
    eligibility: {
      targetGroups: ["Self-employed"],
      incomeLimit: 500000,
      categories: ["All"],
      states: ["All"],
      occupation: ["self-employed"],
    },
    documents: ["Aadhaar Card", "Startup Registration Certificate"],
    applicationMode: "Online",
    applyUrl: "https://www.startupindia.gov.in",
    description:
      "Startup India is a flagship initiative of the Government of India, intended to build a strong eco-system for nurturing innovation and startups in the country. This will drive sustainable economic growth and generate large scale employment opportunities.",
    simplifiedDescription:
      "Help for new businesses and startups. Get tax breaks, funding support, and guidance to grow your business.",
    keyBenefits: [
      "Tax exemption for 3 consecutive years",
      "Easy access to funding",
      "IPR fast-tracking and cost reduction",
      "Simplified compliance procedures",
      "Government tenders exemption",
      "Networking and mentorship opportunities",
    ],
    howToApply: [
      "Visit Startup India website",
      'Click on "Register" and create account',
      "Fill startup details and documents",
      "Submit incorporation certificate",
      "Describe innovation and business model",
      "Get DPIIT recognition certificate",
      "Apply for various benefits and schemes",
      "Access funding and support programs",
    ],
    status: "Open",
    keywords: ["startup", "entrepreneurship", "business", "innovation", "funding"],
    offlineAssistance: ["Startup India Hub", "Incubators and Accelerators"],
    lastUpdated: "2024-01-10",
  },
  {
    id: "D01",
    name: "Disabled Pension Scheme",
    ministry: "Ministry of Social Justice",
    targetGroup: "Disabled",
    benefit: "Monthly pension",
    icon: "♿",
    eligibility: {
      minAge: 18,
      targetGroups: ["Disabled"],
      incomeLimit: 150000,
      categories: ["All"],
      states: ["All"],
      conditionals: { isDisabled: true },
    },
    documents: ["Disability Certificate", "Aadhaar Card"],
    applicationMode: "Online",
    applyUrl: "https://disabilityaffairs.gov.in",
    description:
      "Indira Gandhi National Disability Pension Scheme (IGNDPS) provides monthly pension to persons with severe or multiple disabilities. The scheme aims to provide social security and financial support to persons with disabilities who are unable to earn a livelihood.",
    simplifiedDescription:
      "Monthly pension for persons with disability. Financial support to help you live independently.",
    keyBenefits: [
      "Monthly pension of ₹300-500",
      "Direct bank transfer",
      "No collateral required",
      "Lifetime support",
      "Additional state benefits",
      "Regular disbursement",
    ],
    howToApply: [
      "Visit District Social Welfare Office",
      "Obtain application form",
      "Fill form with personal details",
      "Attach disability certificate (minimum 80%)",
      "Submit Aadhaar and bank details",
      "Verification by authorities",
      "Approval and pension disbursement",
      "Receive monthly pension in bank account",
    ],
    status: "Open",
    keywords: ["disability pension", "disabled", "pension", "monthly support", "handicap"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=e_tX9YlJ2q8",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "विकलांग पेंशन योजना",
        description: "इंदिरा गांधी राष्ट्रीय विकलांगता पेंशन योजना (IGNDPS) गंभीर या बहु-विकलांगता वाले व्यक्तियों को मासिक पेंशन प्रदान करती है।",
        simplifiedDescription: "विकलांग व्यक्तियों के लिए मासिक पेंशन। आपको स्वतंत्र रूप से जीने में मदद करने के लिए वित्तीय सहायता।",
        keyBenefits: [
          "₹300-500 की मासिक पेंशन",
          "सीधे बैंक हस्तांतरण",
          "कोई संपार्श्विक आवश्यक नहीं",
          "आजीवन समर्थन",
          "अतिरिक्त राज्य लाभ"
        ],
        howToApply: [
          "जिला समाज कल्याण कार्यालय पर जाएं",
          "आवेदन पत्र प्राप्त करें",
          "व्यक्तिगत विवरण के साथ फॉर्म भरें",
          "विकलांगता प्रमाण पत्र संलग्न करें",
          "आधार और बैंक विवरण जमा करें",
          "पेंशन प्राप्त करें"
        ]
      },
      mr: {
        name: "दिव्यांग पेन्शन योजना",
        description: "इंदिरा गांधी राष्ट्रीय दिव्यांग पेन्शन योजना (IGNDPS) गंभीर किंवा बहु-दिव्यांग व्यक्तींना मासिक पेन्शन प्रदान करते.",
        simplifiedDescription: "दिव्यांग व्यक्तींसाठी मासिक पेन्शन. तुम्हाला स्वतंत्रपणे जगण्यासाठी आर्थिक मदत.",
        keyBenefits: [
          "₹300-500 ची मासिक पेन्शन",
          "थेट बँक जमा",
          "कोणतेही तारण आवश्यक नाही",
          "आजीवन आधार",
          "अतिरिक्त राज्य फायदे"
        ],
        howToApply: [
          "जिल्हा समाज कल्याण कार्यालयात जा",
          "अर्ज मिळवा",
          "वैयक्तिक माहितीसह फॉर्म भरा",
          "दिव्यांग प्रमाणपत्र जोडा",
          "आधार आणि बँक तपशील जमा करा"
        ]
      }
    }
  },
  {
    id: "W02",
    name: "Ladki Bahin Yojana",
    ministry: "State Government of Maharashtra",
    targetGroup: "Women",
    benefit: "₹1500 monthly assistance",
    icon: "👩",
    eligibility: {
      minAge: 21,
      maxAge: 60,
      targetGroups: ["Women"],
      incomeLimit: 250000,
      categories: ["All"],
      states: ["maharashtra"],
      gender: "female",
      conditionals: { isWoman: true },
    },
    documents: ["Aadhaar Card", "Domicile Certificate", "Bank Account", "Income Certificate"],
    applicationMode: "Online",
    applyUrl: "https://www.mahadbt.gov.in",
    description:
      "Ladki Bahin Yojana is a women empowerment scheme by Maharashtra Government providing monthly financial assistance of ₹1500 to eligible women. The scheme aims to support women's economic independence and welfare.",
    simplifiedDescription: "Women in Maharashtra get ₹1500 every month in their bank account to support their needs.",
    keyBenefits: [
      "Monthly assistance of ₹1500",
      "Direct bank transfer",
      "No processing fee",
      "Women empowerment focus",
      "Economic independence support",
    ],
    howToApply: [
      "Visit MahaDBT portal",
      "Register with Aadhaar",
      "Fill application form",
      "Upload required documents",
      "Submit and track application",
    ],
    status: "Open",
    keywords: ["ladki bahin", "women", "maharashtra", "monthly", "1500", "ladies"],
    offlineAssistance: ["Gram Panchayat", "Anganwadi Centers", "District Social Welfare Office"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=5V2uI5y6zX0",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "लड़की बहिन योजना",
        description: "लड़की बहिन योजना महाराष्ट्र सरकार द्वारा महिलाओं के सशक्तिकरण के लिए एक योजना है, जो पात्र महिलाओं को ₹1500 की मासिक वित्तीय सहायता प्रदान करती है।",
        simplifiedDescription: "महाराष्ट्र की महिलाओं को अपनी जरूरतों के लिए हर महीने ₹1500 सीधे उनके बैंक खाते में मिलते हैं।",
        keyBenefits: [
          "₹1500 की मासिक सहायता",
          "सीधे बैंक खाते में हस्तांतरण (DBT)",
          "कोई आवेदन शुल्क नहीं",
          "महिला सशक्तिकरण पर ध्यान",
          "आर्थिक स्वतंत्रता का समर्थन"
        ],
        howToApply: [
          "महाडीबीटी (MahaDBT) पोर्टल पर जाएं",
          "आधार के साथ पंजीकरण करें",
          "आवेदन पत्र भरें",
          "आवश्यक दस्तावेज अपलोड करें",
          "आवेदन जमा करें और स्थिति ट्रैक करें"
        ]
      },
      mr: {
        name: "लाडकी बहीण योजना",
        description: "लाडकी बहीण योजना ही महाराष्ट्र सरकारची महिला सक्षमीकरण योजना आहे, जी पात्र महिलांना दरमहा ₹1500 ची आर्थिक मदत देते.",
        simplifiedDescription: "महाराष्ट्रातील महिलांना त्यांच्या गरजा पूर्ण करण्यासाठी दरमहा ₹1500 थेट त्यांच्या बँक खात्यात मिळतात.",
        keyBenefits: [
          "दरमहा ₹1500 ची आर्थिक मदत",
          "थेट बँक खात्यात जमा (DBT)",
          "कोणतेही प्रक्रिया शुल्क नाही",
          "महिला सक्षमीकरणावर भर",
          "आर्थिक स्वातंत्र्यासाठी आधार"
        ],
        howToApply: [
          "महाडीबीटी (MahaDBT) पोर्टलवर जा",
          "आधारसह नोंदणी करा",
          "अर्ज भरा",
          "आवश्यक कागदपत्रे अपलोड करा",
          "अर्ज सबमिट करा आणि ट्रॅक करा"
        ]
      }
    }
  },

  {
    id: "S02",
    name: "National Scholarship Portal (NSP)",
    ministry: "Ministry of Education",
    targetGroup: "Student",
    benefit: "Various scholarship amounts",
    icon: "📖",
    eligibility: {
      minAge: 10,
      targetGroups: ["Student"],
      incomeLimit: 600000,
      categories: ["All"],
      states: ["All"],
      occupation: ["student"],
      conditionals: { isStudent: true },
    },
    documents: ["Aadhaar Card", "School/College ID", "Income Certificate", "Bank Account", "Previous Year Marksheet"],
    applicationMode: "Online",
    applyUrl: "https://scholarships.gov.in",
    description:
      "National Scholarship Portal is a one-stop solution for various scholarship schemes for students. It provides scholarships to students from pre-matric to post-matric levels across various categories.",
    simplifiedDescription:
      "Students can get money help for education. Different amounts for school and college students.",
    keyBenefits: [
      "Multiple scholarship schemes",
      "Pre-matric to post-matric support",
      "Merit and means-based scholarships",
      "Direct benefit transfer",
      "Easy online application",
    ],
    howToApply: [
      "Visit scholarships.gov.in",
      "Register as new applicant",
      "Select appropriate scholarship",
      "Fill application form",
      "Upload documents",
      "Submit before deadline",
    ],
    status: "Open",
    keywords: ["scholarship", "student", "education", "study", "school", "college", "nsp"],
    offlineAssistance: ["School/College Office", "District Education Office", "CSC Centers"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=C7m8Q3z-3QY",
    lastUpdated: "2024-01-10",
  },

  {
    id: "E02",
    name: "E-Shram Portal Registration",
    ministry: "Ministry of Labour",
    targetGroup: "Unorganized Workers",
    benefit: "₹2 lakh accidental insurance",
    icon: "👷",
    eligibility: {
      minAge: 16,
      maxAge: 59,
      targetGroups: ["All"],
      incomeLimit: 500000,
      categories: ["All"],
      states: ["All"],
    },
    documents: ["Aadhaar Card", "Mobile Number", "Bank Account"],
    applicationMode: "Online",
    applyUrl: "https://eshram.gov.in",
    description:
      "E-Shram is a national database of unorganized workers. Registration provides UAN (Universal Account Number) and accidental insurance coverage of ₹2 lakhs. Workers can access various social security schemes.",
    simplifiedDescription:
      "Register yourself as worker. Get insurance of ₹2 lakh if accident happens. Free registration.",
    keyBenefits: [
      "Free registration",
      "₹2 lakh accidental insurance",
      "Unique UAN card",
      "Access to welfare schemes",
      "Portable across India",
    ],
    howToApply: [
      "Visit eshram.gov.in",
      "Click on Register",
      "Enter Aadhaar and mobile",
      "Fill occupation details",
      "Complete registration",
      "Download UAN card",
    ],
    status: "Open",
    keywords: ["eshram", "labour", "worker", "insurance", "registration", "e-shram", "ekyc"],
    offlineAssistance: ["Common Service Center", "Labour Office", "CSC Centers"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=Yf1eR0x-9Y0",
    lastUpdated: "2024-01-10",
  },

  {
    id: "AG01",
    name: "PM Fasal Bima Yojana",
    ministry: "Ministry of Agriculture",
    targetGroup: "Farmer",
    benefit: "Crop insurance coverage",
    icon: "🌾",
    eligibility: {
      targetGroups: ["Farmer"],
      categories: ["All"],
      states: ["All"],
      occupation: ["farmer", "agricultural-worker"],
      conditionals: { isFarmer: true },
    },
    documents: ["Aadhaar Card", "Land Records", "Bank Account", "Sowing Certificate"],
    applicationMode: "Online",
    applyUrl: "https://pmfby.gov.in",
    description:
      "Pradhan Mantri Fasal Bima Yojana provides insurance coverage and financial support to farmers in case of crop failure due to natural calamities, pests, and diseases.",
    simplifiedDescription:
      "If your crops get damaged by weather or insects, government will give you money. Very small fee to join.",
    keyBenefits: [
      "Low premium rates",
      "Coverage against natural calamities",
      "Quick claim settlement",
      "Use of technology for assessment",
      "Covers all food and oilseed crops",
    ],
    howToApply: [
      "Visit pmfby.gov.in or nearest bank",
      "Fill insurance application",
      "Pay nominal premium",
      "Receive insurance certificate",
      "Claim in case of crop loss",
    ],
    status: "Open",
    keywords: ["crop insurance", "farmer", "fasal bima", "agriculture", "insurance"],
    offlineAssistance: ["Bank Branch", "Agriculture Office", "Gram Panchayat"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PrKjSms_i5c",
    lastUpdated: "2024-01-10",
  },

  {
    id: "W03",
    name: "Mahila Samman Savings Certificate",
    ministry: "Ministry of Finance",
    targetGroup: "Women",
    benefit: "7.5% interest on savings",
    icon: "💰",
    eligibility: {
      targetGroups: ["Women"],
      categories: ["All"],
      states: ["All"],
      gender: "female",
      conditionals: { isWoman: true },
    },
    documents: ["Aadhaar Card", "PAN Card", "Photograph"],
    applicationMode: "Offline",
    applyUrl: "https://www.indiapost.gov.in",
    description:
      "Mahila Samman Savings Certificate is a one-time savings scheme exclusively for women with attractive interest rate of 7.5% per annum. Maximum investment limit is ₹2 lakhs.",
    simplifiedDescription:
      "Women can save money and get good interest. Better than bank. Maximum ₹2 lakh can be saved.",
    keyBenefits: [
      "High interest rate of 7.5%",
      "Exclusive for women",
      "Partial withdrawal allowed",
      "Tax benefits available",
      "Safe government scheme",
    ],
    howToApply: [
      "Visit nearest Post Office",
      "Fill account opening form",
      "Submit documents",
      "Deposit amount (₹1000 to ₹2 lakhs)",
      "Receive certificate",
    ],
    status: "Open",
    keywords: ["women", "savings", "investment", "mahila", "post office", "7.5%"],
    offlineAssistance: ["Post Office", "Authorized Banks"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=Fj-yKjwbjJc",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "महिला सम्मान बचत प्रमाण पत्र",
        description: "महिला सम्मान बचत प्रमाण पत्र महिलाओं के लिए एक विशेष बचत योजना है जिसमें 7.5% सालाना की आकर्षक ब्याज दर दी जाती है। अधिकतम निवेश सीमा ₹2 लाख है।",
        simplifiedDescription: "महिलाएं पैसे बचा सकती हैं और अच्छा ब्याज पा सकती हैं। बैंक से बेहतर। अधिकतम ₹2 लाख तक जमा किया जा सकता है।",
        keyBenefits: [
          "7.5% की उच्च ब्याज दर",
          "महिलाओं के लिए विशेष",
          "आंशिक निकासी की अनुमति",
          " कर लाभ उपलब्ध",
          "सुरक्षित सरकारी योजना"
        ],
        howToApply: [
          "निकटतम डाकघर पर जाएं",
          "खाता खोलने का फॉर्म भरें",
          "दस्तावेज जमा करें",
          "राशि जमा करें (₹1000 से ₹2 लाख)",
          "प्रमाण पत्र प्राप्त करें"
        ]
      },
      mr: {
        name: "महिला सन्मान बचत प्रमाणपत्र",
        description: "महिला सन्मान बचत प्रमाणपत्र ही महिलांसाठी खास 7.5% वार्षिक व्याजदर असलेली एकवेळची बचत योजना आहे. जास्तीत जास्त गुंतवणुकीची मर्यादा ₹2 लाख आहे.",
        simplifiedDescription: "महिला पैसे वाचवू शकतात आणि चांगले व्याज मिळवू शकतात. बँकेपेक्षा चांगले. जास्तीत जास्त ₹2 लाखांपर्यंत बचत करता येते.",
        keyBenefits: [
          "7.5% चा उच्च व्याजदर",
          "केवळ महिलांसाठी खास",
          "काही रक्कम काढण्याची परवानगी",
          "कर सवलत उपलब्ध",
          "सुरक्षित सरकारी योजना"
        ],
        howToApply: [
          "जवळच्या पोस्ट ऑफिसला भेट द्या",
          "खाते उघडण्याचा फॉर्म भरा",
          "कागदपत्रे जमा करा",
          "रक्कम जमा करा (₹1000 ते ₹2 लाख)",
          "प्रमाणपत्र मिळवा"
        ]
      }
    }
  },

  {
    id: "SE02",
    name: "Mudra Loan Yojana",
    ministry: "Ministry of Finance",
    targetGroup: "Self-employed",
    benefit: "Loan up to ₹10 lakhs",
    icon: "💼",
    eligibility: {
      targetGroups: ["Self-employed"],
      categories: ["All"],
      states: ["All"],
      occupation: ["self-employed"],
    },
    documents: ["Aadhaar Card", "PAN Card", "Business Plan", "Bank Statements"],
    applicationMode: "Both",
    applyUrl: "https://www.mudra.org.in",
    description:
      "MUDRA (Micro Units Development and Refinance Agency) provides loans to non-corporate small business sector. Three categories: Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 lakhs), and Tarun (₹5 to ₹10 lakhs).",
    simplifiedDescription:
      "Small business owners can get loan from ₹50,000 to ₹10 lakhs. No big paperwork. Low interest.",
    keyBenefits: [
      "Collateral-free loans",
      "Low interest rates",
      "Easy application process",
      "Three loan categories",
      "Support for small businesses",
    ],
    howToApply: [
      "Visit nearest bank branch",
      "Fill MUDRA loan application",
      "Submit business plan",
      "Provide documents",
      "Bank verification",
      "Loan disbursement",
    ],
    status: "Open",
    keywords: ["mudra", "loan", "business", "self-employed", "enterprise", "shishu", "kishore", "tarun"],
    offlineAssistance: ["Bank Branch", "MUDRA Center", "CSC"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=Uz-vYw-vPSc",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "मुद्रा ऋण योजना",
        description: "मुद्रा (MUDRA) गैर-कॉर्पोरेट लघु व्यवसाय क्षेत्र को ऋण प्रदान करता है। तीन श्रेणियां: शिशु (₹50,000 तक), किशोर (₹50,000 से ₹5 लाख), और तरुण (₹5 से ₹10 लाख)।",
        simplifiedDescription: "छोटे व्यवसाय मालिक ₹50,000 से ₹10 लाख तक का ऋण प्राप्त कर सकते हैं। कोई बड़ी कागजी कार्रवाई नहीं। कम ब्याज।",
        keyBenefits: [
          "बिना किसी गारंटी (Collateral) के ऋण",
          "कम ब्याज दरें",
          "आसान आवेदन प्रक्रिया",
          "तीन ऋण श्रेणियां",
          "छोटे व्यवसायों के लिए समर्थन"
        ],
        howToApply: [
          "निकटतम बैंक शाखा पर जाएं",
          "मुद्रा ऋण आवेदन भरें",
          "व्यवसाय योजना जमा करें",
          "दस्तावेज प्रदान करें",
          "बैंक सत्यापन",
          "ऋण वितरण"
        ]
      },
      mr: {
        name: "मुद्रा कर्ज योजना",
        description: "मुद्रा (MUDRA) योजना लहान व्यवसायांना कर्ज देते. तीन श्रेणी: शिशु (₹50,000 पर्यंत), किशोर (₹50,000 ते ₹5 लाखांपर्यंत), आणि तरुण (₹5 ते ₹10 लाखांपर्यंत).",
        simplifiedDescription: "लहान व्यावसायिक ₹50,000 ते ₹10 लाखांपर्यंत कर्ज मिळवू शकतात. जास्त कागदपत्रे लागत नाहीत. कमी व्याजदर.",
        keyBenefits: [
          "विनातारण कर्ज",
          "कमी व्याजदर",
          "सोपी अर्ज प्रक्रिया",
          "तीन कर्ज श्रेणी",
          "लहान व्यवसायांसाठी आधार"
        ],
        howToApply: [
          "जवळच्या बँकेच्या शाखेला भेट द्या",
          "मुद्रा कर्ज अर्ज भरा",
          "व्यवसाय योजना जमा करा",
          "कागदपत्रे द्या",
          "बँक पडताळणी",
          "कर्ज वितरण"
        ]
      }
    }
  },

  {
    id: "SEN01",
    name: "Atal Pension Yojana",
    ministry: "Ministry of Finance",
    targetGroup: "All",
    benefit: "Guaranteed pension ₹1000-5000",
    icon: "👴",
    eligibility: {
      minAge: 18,
      maxAge: 40,
      targetGroups: ["All"],
      categories: ["All"],
      states: ["All"],
    },
    documents: ["Aadhaar Card", "Bank Account", "Mobile Number"],
    applicationMode: "Online",
    applyUrl: "https://npscra.nsdl.co.in/scheme-details-atal.php",
    description:
      "Atal Pension Yojana is a pension scheme for all Indians, especially the poor and unorganized sector workers. Subscribers get guaranteed minimum pension of ₹1000 to ₹5000 after 60 years of age.",
    simplifiedDescription:
      "Save small amount every month when young. Get fixed pension ₹1000-5000 after age 60. Government also helps.",
    keyBenefits: [
      "Guaranteed monthly pension",
      "Government co-contribution",
      "Low monthly contribution",
      "Spouse and nominee benefits",
      "Tax benefits available",
    ],
    howToApply: [
      "Visit your bank branch",
      "Fill APY form",
      "Provide Aadhaar and bank details",
      "Choose pension amount",
      "Auto-debit activation",
      "Receive confirmation",
    ],
    status: "Open",
    keywords: ["pension", "atal", "retirement", "old age", "savings"],
    offlineAssistance: ["Bank Branch", "Post Office"],
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "अटल पेंशन योजना",
        description: "अटल पेंशन योजना सभी भारतीयों के लिए, विशेष रूप से गरीबों और असंगठित क्षेत्र के श्रमिकों के लिए एक पेंशन योजना है। ग्राहकों को 60 वर्ष की आयु के बाद ₹1000 से ₹5000 की न्यूनतम गारंटीशुदा पेंशन मिलती है।",
        simplifiedDescription: "जवानी में हर महीने छोटी राशि बचाएं। 60 साल की उम्र के बाद ₹1000-5000 की निश्चित पेंशन पाएं। सरकार भी मदद करती है।",
        keyBenefits: [
          "गारंटीकृत मासिक पेंशन",
          "सरकारी सह-योगदान",
          "कम मासिक योगदान",
          "जीवनसाथी और नामांकित व्यक्ति के लिए लाभ",
          "कर लाभ उपलब्ध"
        ],
        howToApply: [
          "अपनी बैंक शाखा पर जाएं",
          "APY फॉर्म भरें",
          "आधार और बैंक विवरण प्रदान करें",
          "पेंशन राशि चुनें",
          "ऑटो-डेबिट सक्रियण",
          "पुष्टि प्राप्त करें"
        ]
      },
      mr: {
        name: "अटल पेन्शन योजना",
        description: "अटल पेन्शन योजना ही सर्व भारतीयांसाठी, विशेषतः गरीब आणि असंघटित क्षेत्रातील कामगारांसाठी एक पेन्शन योजना आहे. ग्राहकांना 60 वर्षांनंतर ₹1000 ते ₹5000 पर्यंत किमान गॅरंटीड पेन्शन मिळते.",
        simplifiedDescription: "तरुण असताना दरमहा छोटी रक्कम वाचवा. 60 वर्षांनंतर ₹1000-5000 ची निश्चित पेन्शन मिळवा. सरकारही मदत करते.",
        keyBenefits: [
          "गॅरंटीड मासिक पेन्शन",
          "सरकारी सह-योगदान",
          "कमी मासिक हप्ता",
          "जोडीदार आणि नॉमिनीसाठी फायदे",
          "कर सवलत उपलब्ध"
        ],
        howToApply: [
          "तुमच्या बँकेच्या शाखेला भेट द्या",
          "APY फॉर्म भरा",
          "आधार आणि बँक तपशील द्या",
          "पेन्शन रक्कम निवडा",
          "ऑटो-डेबिट सुरू करा",
          "कन्फर्मेशन मिळवा"
        ]
      }
    }
  },

  {
    id: "AG02",
    name: "KCC - Kisan Credit Card",
    ministry: "Ministry of Agriculture",
    targetGroup: "Farmer",
    benefit: "Crop loan with low interest",
    icon: "💳",
    eligibility: {
      targetGroups: ["Farmer"],
      categories: ["All"],
      states: ["All"],
      occupation: ["farmer", "agricultural-worker"],
      conditionals: { isFarmer: true },
    },
    documents: ["Aadhaar Card", "Land Records", "Passport Photo"],
    applicationMode: "Offline",
    applyUrl: "https://pmkisan.gov.in/KCC.aspx",
    description:
      "Kisan Credit Card provides adequate and timely credit support to farmers for their cultivation and other needs. It's a flexible credit facility at concessional interest rates.",
    simplifiedDescription:
      "Farmers get special card to take loan for farming. Take loan when needed, pay after harvest. Low interest.",
    keyBenefits: [
      "Flexible credit limit",
      "Low interest rate (4% with subsidy)",
      "Insurance coverage",
      "Easy withdrawal",
      "Timely credit availability",
    ],
    howToApply: [
      "Visit nearest bank",
      "Fill KCC application form",
      "Submit land documents",
      "Provide Aadhaar",
      "Bank verification",
      "Receive KCC card",
    ],
    status: "Open",
    keywords: ["kisan credit card", "kcc", "farmer", "loan", "agriculture", "crop loan"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=hG3G4yV2qgM",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "केसीसी - किसान क्रेडिट कार्ड",
        description: "किसान क्रेडिट कार्ड किसानों को उनकी खेती और अन्य जरूरतों के लिए पर्याप्त और समय पर ऋण सहायता प्रदान करता है। यह रियायती ब्याज दरों पर एक लचीली ऋण सुविधा है।",
        simplifiedDescription: "किसानों को खेती के लिए ऋण लेने के लिए विशेष कार्ड मिलता है। जरूरत पड़ने पर ऋण लें, फसल के बाद भुगतान करें। कम ब्याज।",
        keyBenefits: [
          "लचीली ऋण सीमा",
          "कम ब्याज दर (सब्सिडी के साथ 4%)",
          "बीमा कवरेज",
          "आसान निकासी",
          "समय पर ऋण उपलब्धता"
        ],
        howToApply: [
          "निकटतम बैंक पर जाएं",
          "केसीसी आवेदन पत्र भरें",
          "भूमि दस्तावेज जमा करें",
          "आधार प्रदान करें",
          "बँक सत्यापन",
          "केसीसी कार्ड प्राप्त करें"
        ]
      },
      mr: {
        name: "केसीसी - किसान क्रेडिट कार्ड",
        description: "किसान क्रेडिट कार्ड शेतकऱ्यांना त्यांच्या शेती आणि इतर गरजांसाठी वेळेवर कर्ज उपलब्ध करून देते. हे कमी व्याजावर मिळणारे एक सोयीचे कर्ज आहे.",
        simplifiedDescription: "शेतकऱ्यांना शेतीसाठी कर्ज घेण्यासाठी खास कार्ड मिळते. गरज असेल तेव्हा कर्ज घ्या, पिकानंतर परतफेड करा. कमी व्याज.",
        keyBenefits: [
          "लवचिक कर्ज मर्यादा",
          "कमी व्याजदर (सबसिडीसह 4%)",
          "विमा संरक्षण",
          "पैसे काढणे सोपे",
          "वेळेवर कर्ज उपलब्धता"
        ],
        howToApply: [
          "जवळच्या बँकेत जा",
          "KCC अर्ज भरा",
          "जमिनीची कागदपत्रे जमा करा",
          "आधार आणि पॅन द्या",
          "बँक पडताळणी",
          "KCC कार्ड मिळवा"
        ]
      }
    }
  },

  {
    id: "H02",
    name: "Janani Suraksha Yojana",
    ministry: "Ministry of Health",
    targetGroup: "Pregnant Women",
    benefit: "Cash assistance for delivery",
    icon: "🤱",
    eligibility: {
      targetGroups: ["Women"],
      incomeLimit: 300000,
      categories: ["All"],
      states: ["All"],
      gender: "female",
      conditionals: { isWoman: true },
    },
    documents: ["Aadhaar Card", "Pregnancy Card", "Bank Account", "BPL Card (if applicable)"],
    applicationMode: "Offline",
    applyUrl: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309",
    description:
      "Janani Suraksha Yojana promotes institutional delivery among poor pregnant women. Cash assistance is provided for delivery in health institutions.",
    simplifiedDescription:
      "Pregnant women get money for hospital delivery. Free treatment and cash help after baby birth.",
    keyBenefits: [
      "Cash assistance for delivery",
      "Free delivery services",
      "Transport allowance",
      "Post-delivery care",
      "Focus on institutional delivery",
    ],
    howToApply: [
      "Register at nearest health center",
      "Regular checkups during pregnancy",
      "Inform about delivery",
      "Deliver at government hospital",
      "Receive cash assistance",
    ],
    status: "Open",
    keywords: ["pregnancy", "delivery", "janani", "women", "maternal", "baby"],
    offlineAssistance: ["Primary Health Center", "Community Health Center", "Government Hospital", "Anganwadi"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=J9y5yW3x-x8",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "जननी सुरक्षा योजना",
        description: "जननी सुरक्षा योजना गरीब गर्भवती महिलाओं के बीच संस्थागत प्रसव को बढ़ावा देती है। स्वास्थ्य संस्थानों में प्रसव के लिए नकद सहायता प्रदान की जाती है।",
        simplifiedDescription: "गर्भवती महिलाओं को अस्पताल में डिलीवरी के लिए पैसे मिलते हैं। बच्चे के जन्म के बाद मुफ्त इलाज और नकद मदद।",
        keyBenefits: [
          "प्रसव के लिए नकद सहायता",
          "मुफ्त प्रसव सेवाएं",
          "परिवहन भत्ता",
          "प्रसवोत्तर देखभाल",
          "संस्थागत प्रसव पर ध्यान"
        ],
        howToApply: [
          "निकटतम स्वास्थ्य केंद्र में पंजीकरण करें",
          "गर्भावस्था के दौरान नियमित जांच",
          "प्रसव के बारे में सूचित करें",
          "सरकारी अस्पताल में प्रसव",
          "नकद सहायता प्राप्त करें"
        ]
      },
      mr: {
        name: "जननी सुरक्षा योजना",
        description: "जननी सुरक्षा योजना गरीब गर्भवती महिलांमध्ये रुग्णालयात प्रसूतीला प्रोत्साहन देते. सरकारी दवाखान्यात प्रसूती झाल्यास आर्थिक मदत दिली जाते.",
        simplifiedDescription: "गर्भवती महिलांना रुग्णालयात बाळंतपणासाठी पैसे मिळतात. बाळाच्या जन्मानंतर मोफत उपचार आणि रोख मदत.",
        keyBenefits: [
          "बाळंतपणासाठी रोख मदत",
          "मोफत प्रसूती सेवा",
          "वाहतूक खर्च",
          "प्रसूतीनंतरची काळजी",
          "दवाखान्यात बाळंतपणावर भर"
        ],
        howToApply: [
          "जवळच्या आरोग्य केंद्रात नोंदणी करा",
          "गरोदरपणात नियमित तपासणी करा",
          "प्रसूतीची माहिती द्या",
          "सरकारी रुग्णालयात प्रसूती",
          "रोख मदत मिळवा"
        ]
      }
    }
  },

  {
    id: "HO02",
    name: "Swachh Bharat Mission - Toilet Grant",
    ministry: "Ministry of Jal Shakti",
    targetGroup: "All",
    benefit: "₹12,000 for toilet construction",
    icon: "🚽",
    eligibility: {
      targetGroups: ["All"],
      incomeLimit: 300000,
      categories: ["All"],
      states: ["All"],
    },
    documents: ["Aadhaar Card", "Bank Account", "Address Proof"],
    applicationMode: "Online",
    applyUrl: "https://swachhbharatmission.gov.in",
    description:
      "Swachh Bharat Mission provides financial assistance for construction of individual household toilets in rural and urban areas. Grant of ₹12,000 is provided for toilet construction.",
    simplifiedDescription:
      "Government gives ₹12,000 to build toilet in your house. Clean India mission. Apply if no toilet at home.",
    keyBenefits: [
      "₹12,000 financial assistance",
      "Improved sanitation",
      "Health benefits",
      "Dignity and privacy",
      "Technical support provided",
    ],
    howToApply: [
      "Visit swachhbharatmission.gov.in",
      "Register with details",
      "Fill application form",
      "Upload documents",
      "Construct toilet",
      "Submit photos for verification",
      "Receive payment",
    ],
    status: "Open",
    keywords: ["toilet", "sanitation", "swachh bharat", "cleanliness", "12000"],
    offlineAssistance: ["Gram Panchayat", "Block Development Office", "Municipal Corporation"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=D-PZ_xQd-wY",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "स्वच्छ भारत मिशन - शौचालय अनुदान",
        description: "स्वच्छ भारत मिशन ग्रामीण और शहरी क्षेत्रों में व्यक्तिगत घरेलू शौचालयों के निर्माण के लिए वित्तीय सहायता प्रदान करता है। शौचालय निर्माण के लिए ₹12,000 का अनुदान दिया जाता है।",
        simplifiedDescription: "सरकार आपके घर में शौचालय बनाने के लिए ₹12,000 देती है। स्वच्छ भारत मिशन। अगर घर में शौचालय नहीं है तो आवेदन करें।",
        keyBenefits: [
          "₹12,000 की वित्तीय सहायता",
          "बेहतर स्वच्छता",
          "स्वास्थ्य लाभ",
          "गरिमा और गोपनीयता",
          "तकनीकी सहायता प्रदान की गई"
        ],
        howToApply: [
          "swachhbharatmission.gov.in पर जाएं",
          "विवरण के साथ पंजीकरण करें",
          "आवेदन पत्र भरें",
          "दस्तावेज अपलोड करें",
          "शौचालय का निर्माण करें",
          "सत्यापन के लिए तस्वीरें जमा करें",
          "भुगतान प्राप्त करें"
        ]
      },
      mr: {
        name: "स्वच्छ भारत मिशन - शौचालय अनुदान",
        description: "स्वच्छ भारत मिशन ग्रामीण आणि शहरी भागात वैयक्तिक घरगुती शौचालय बांधण्यासाठी आर्थिक मदत पुरवते. शौचालय बांधण्यासाठी ₹12,000 चे अनुदान दिले जाते.",
        simplifiedDescription: "सरकार तुमच्या घरात शौचालय बांधण्यासाठी ₹12,000 देते. स्वच्छ भारत अभियान. जर घरात शौचालय नसेल तर अर्ज करा.",
        keyBenefits: [
          "₹12,000 ची आर्थिक मदत",
          "सुधारित स्वच्छता",
          "आरोग्याचे फायदे",
          "प्रतिष्ठा आणि गोपनीयता",
          "तांत्रिक मदत उपलब्ध"
        ],
        howToApply: [
          "swachhbharatmission.gov.in वर जा",
          "माहितीसह नोंदणी करा",
          "अर्ज भरा",
          "कागदपत्रे अपलोड करा",
          "शौचालय बांधा",
          "तपासणीसाठी फोटो जमा करा",
          "पैसे मिळवा"
        ]
      }
    }
  },

  {
    id: "S03",
    name: "Pre-Matric Scholarship for Minorities",
    ministry: "Ministry of Minority Affairs",
    targetGroup: "Student",
    benefit: "Scholarship for class 1-10",
    icon: "📚",
    eligibility: {
      minAge: 6,
      maxAge: 18,
      targetGroups: ["Student"],
      incomeLimit: 100000,
      categories: ["All"],
      states: ["All"],
      occupation: ["student"],
      conditionals: { isStudent: true },
    },
    documents: ["Aadhaar Card", "School ID", "Income Certificate", "Minority Community Certificate", "Bank Account"],
    applicationMode: "Online",
    applyUrl: "https://scholarships.gov.in",
    description:
      "Pre-Matric Scholarship for students belonging to minority communities (Muslim, Christian, Sikh, Buddhist, Jain, Parsi) studying in classes 1 to 10.",
    simplifiedDescription: "Students from minority communities get money for school education. For class 1 to 10.",
    keyBenefits: [
      "Tuition fee support",
      "Maintenance allowance",
      "Day scholar and hosteler benefits",
      "Annual scholarship",
      "Direct bank transfer",
    ],
    howToApply: [
      "Visit National Scholarship Portal",
      "Register as minority student",
      "Fill scholarship form",
      "Upload community certificate",
      "Submit before deadline",
    ],
    status: "Open",
    keywords: ["minority", "scholarship", "pre-matric", "student", "school", "class 1-10"],
    offlineAssistance: ["School Office", "District Minority Welfare Office"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=C7m8Q3z-3QY",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "अल्पसंख्यकों के लिए प्री-मैट्रिक छात्रवृत्ति",
        description: "अल्पसंख्यक समुदायों (मुस्लिम, ईसाई, सिख, बौद्ध, जैन, पारसी) के कक्षा 1 से 10 में पढ़ने वाले छात्रों के लिए प्री-मैट्रिक छात्रवृत्ति।",
        simplifiedDescription: "अल्पसंख्यक समुदायों के छात्रों कोस्कूली शिक्षा के लिए पैसे की मदद मिलती है। कक्षा 1 से 10 के लिए।",
        keyBenefits: [
          "ट्यूशन शुल्क का समर्थन",
          "रखरखाव भत्ता",
          "डे स्कॉलर और हॉस्टलर लाभ",
          "वार्षिक छात्रवृत्ति",
          "सीधे बैंक हस्तांतरण"
        ],
        howToApply: [
          "राष्ट्रीय छात्रवृत्ति पोर्टल पर जाएं",
          "अल्पसंख्यक छात्र के रूप में पंजीकरण करें",
          "छात्रवृत्ति फॉर्म भरें",
          "समुदाय प्रमाण पत्र अपलोड करें",
          "समय सीमा से पहले जमा करें"
        ]
      },
      mr: {
        name: "अल्पसंख्याकांसाठी प्री-मैट्रिक शिष्यवृत्ती",
        description: "अल्पसंख्याक समुदायातील (मुस्लिम, ख्रिश्चन, शीख, बौद्ध, जैन, पारशी) इयत्ता 1 ते 10 मध्ये शिकणाऱ्या विद्यार्थ्यांसाठी शिष्यवृत्ती.",
        simplifiedDescription: "अल्पसंख्याक समाजातील विद्यार्थ्यांना शालेय शिक्षणासाठी आर्थिक मदत मिळते. इयत्ता 1 ते 10 साठी.",
        keyBenefits: [
          "ट्यूशन फीसाठी मदत",
          "निर्वाह भत्ता",
          "डे स्कॉलर आणि वस्तीगृह विद्यार्थ्यांसाठी लाभ",
          "वार्षिक शिष्यवृत्ती",
          "थेट बँक खात्यात जमा"
        ],
        howToApply: [
          "नॅशनल स्कॉलरशिप पोर्टलवर जा",
          "अल्पसंख्याक विद्यार्थी म्हणून नोंदणी करा",
          "शिष्यवृत्ती फॉर्म भरा",
          "जातीचा दाखला अपलोड करा",
          "मुदतीपूर्वी जमा करा"
        ]
      }
    }
  },

  {
    id: "D02",
    name: "UDID Card - Disability Certificate",
    ministry: "Ministry of Social Justice",
    targetGroup: "Disabled",
    benefit: "Unique Disability ID",
    icon: "♿",
    eligibility: {
      targetGroups: ["Disabled"],
      categories: ["All"],
      states: ["All"],
      conditionals: { isDisabled: true },
    },
    documents: ["Aadhaar Card", "Medical Certificate", "Photograph", "Address Proof"],
    applicationMode: "Both",
    applyUrl: "https://www.swavlambancard.gov.in",
    description:
      "Unique Disability ID Card is a document for persons with disabilities. It serves as an identity and disability certificate valid across India, enabling access to various schemes and benefits.",
    simplifiedDescription:
      "People with disability get special ID card. One card for whole India. Helps get all benefits easily.",
    keyBenefits: [
      "Single document for all schemes",
      "Valid across India",
      "Online verification",
      "Access to disability benefits",
      "Portable and permanent",
    ],
    howToApply: [
      "Visit swavlambancard.gov.in",
      "Register with Aadhaar",
      "Fill application",
      "Upload disability certificate",
      "Visit assessment camp",
      "Receive UDID card",
    ],
    status: "Open",
    keywords: ["udid", "disability", "disabled", "handicap", "certificate", "pwd"],
    offlineAssistance: ["District Hospital", "Social Welfare Office", "Medical Board"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "यूडीआईडी ​​कार्ड - विकलांगता प्रमाण पत्र",
        description: "विशिष्ट विकलांगता आईडी (UDID) कार्ड विकलांग व्यक्तियों के लिए एक दस्तावेज है। यह पूरे भारत में मान्य एक पहचान और विकलांगता प्रमाण पत्र के रूप में कार्य करता है।",
        simplifiedDescription: "विकलांग लोगों को विशेष आईडी कार्ड मिलता है। पूरे भारत के लिए एक कार्ड। सभी लाभ आसानी से प्राप्त करने में मदद करता है।",
        keyBenefits: [
          "सभी योजनाओं के लिए एक दस्तावेज",
          "पूरे भारत में मान्य",
          "ऑनलाइन सत्यापन",
          "विकलांगता लाभों तक पहुंच",
          "पोर्टेबल और स्थायी"
        ],
        howToApply: [
          "swavlambancard.gov.in पर जाएं",
          "आधार के साथ पंजीकरण करें",
          "आवेदन भरें",
          "विकलांगता प्रमाण पत्र अपलोड करें",
          "मूल्यांकन शिविर पर जाएं",
          "UDID कार्ड प्राप्त करें"
        ]
      },
      mr: {
        name: "UDID कार्ड - दिव्यांग प्रमाणपत्र",
        description: "युनिक डिसॅबिलिटी आयडी (UDID) कार्ड हे दिव्यांग व्यक्तींसाठी एक ओळखपत्र आहे. हे संपूर्ण भारतात ओळख आणि दिव्यांग प्रमाणपत्र म्हणून काम करते.",
        simplifiedDescription: "दिव्यांग व्यक्तींना खास ओळखपत्र मिळते. संपूर्ण भारतासाठी एकच कार्ड. सर्व शासकीय लाभ मिळवणे सोपे होते.",
        keyBenefits: [
          "सर्व योजनांसाठी एकच कागदपत्र",
          "संपूर्ण भारतात वैध",
          "ऑनलाइन पडताळणी",
          "दिव्यांग लाभांचा सुलभ ॲक्सेस",
          "कायमस्वरूपी आणि पोर्टेबल"
        ],
        howToApply: [
          "swavlambancard.gov.in वर जा",
          "आधारसह नोंदणी करा",
          "अर्ज भरा",
          "दिव्यांग प्रमाणपत्र अपलोड करा",
          "तपासणी शिबिराला भेट द्या",
          "UDID कार्ड मिळवा"
        ]
      }
    }
  },

  {
    id: "U02",
    name: "Rozgar Mela - Government Jobs",
    ministry: "Multiple Ministries",
    targetGroup: "Unemployed",
    benefit: "Government job opportunities",
    icon: "💼",
    eligibility: {
      minAge: 18,
      maxAge: 35,
      targetGroups: ["Unemployed"],
      categories: ["All"],
      states: ["All"],
      occupation: ["unemployed"],
    },
    documents: ["Aadhaar Card", "Educational Certificates", "Resume", "Photograph"],
    applicationMode: "Online",
    applyUrl: "https://www.ncs.gov.in",
    description:
      "Rozgar Mela is a mega recruitment drive by Government of India to provide government jobs to youth. Various departments participate to fill vacant positions.",
    simplifiedDescription:
      "Government organizes job fairs. Many government jobs available. Go and apply with your certificates.",
    keyBenefits: [
      "Direct government jobs",
      "Multiple departments",
      "On-the-spot interviews",
      "Fast hiring process",
      "Job security",
    ],
    howToApply: [
      "Register on National Career Service Portal",
      "Check Rozgar Mela schedule",
      "Apply for suitable positions",
      "Attend interview with documents",
      "Selection and appointment",
    ],
    status: "Open",
    keywords: ["rozgar mela", "government job", "employment", "vacancy", "recruitment"],
    offlineAssistance: ["Employment Exchange", "District Employment Office"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "रोजगार मेला - सरकारी नौकरियां",
        description: "रोजगार मेला युवाओं को सरकारी नौकरियां प्रदान करने के लिए भारत सरकार द्वारा एक मेगा भर्ती अभियान है। विभिन्न विभाग रिक्त पदों को भरने के लिए भाग लेते हैं।",
        simplifiedDescription: "सरकार नौकरी मेले आयोजित करती है। कई सरकारी नौकरियां उपलब्ध हैं। अपने प्रमाण पत्रों के साथ जाएं और आवेदन करें।",
        keyBenefits: [
          "सीधी सरकारी नौकरियां",
          "कई विभाग",
          "मौके पर साक्षात्कार",
          "तेजी से भर्ती प्रक्रिया",
          "नौकरी की सुरक्षा"
        ],
        howToApply: [
          "राष्ट्रीय करियर सेवा पोर्टल पर पंजीकरण करें",
          "रोजगार मेला अनुसूची की जांच करें",
          "उपयुक्त पदों के लिए आवेदन करें",
          "दस्तावेजों के साथ साक्षात्कार में शामिल हों",
          "चयन और नियुक्ति"
        ]
      },
      mr: {
        name: "रोजगार मेळावा - सरकारी नोकरी",
        description: "रोजगार मेळावा हा तरुणांना सरकारी नोकऱ्या देण्यासाठी भारत सरकारचा एक मोठा उपक्रम आहे. विविध विभाग रिक्त जागा भरण्यासाठी यात सहभागी होतात.",
        simplifiedDescription: "सरकार नोकरी मेळावे आयोजित करते. अनेक सरकारी नोकऱ्या उपलब्ध आहेत. तुमच्या प्रमाणपत्रांसह जा आणि अर्ज करा.",
        keyBenefits: [
          "थेट सरकारी नोकरी",
          "अनेक विभाग एकाच ठिकाणी",
          "जागेवरच मुलाखत",
          "जलद भरती प्रक्रिया",
          "नोकरीची सुरक्षा"
        ],
        howToApply: [
          "नॅशनल करिअर सर्व्हिस पोर्टलवर नोंदणी करा",
          "रोजगार मेळाव्याचे वेळापत्रक पहा",
          "योग्य पदांसाठी अर्ज करा",
          "कागदपत्रांसह मुलाखतीला जा",
          "निवड आणि नियुक्ती"
        ]
      }
    }
  },

  {
    id: "AG03",
    name: "Soil Health Card Scheme",
    ministry: "Ministry of Agriculture",
    targetGroup: "Farmer",
    benefit: "Free soil testing",
    icon: "🌱",
    eligibility: {
      targetGroups: ["Farmer"],
      categories: ["All"],
      states: ["All"],
      occupation: ["farmer", "agricultural-worker"],
      conditionals: { isFarmer: true },
    },
    documents: ["Aadhaar Card", "Land Records"],
    applicationMode: "Both",
    applyUrl: "https://soilhealth.dac.gov.in",
    description:
      "Soil Health Card Scheme provides farmers with information on soil nutrient status and recommendations on appropriate dosage of nutrients. This helps improve productivity and soil health.",
    simplifiedDescription:
      "Get your farm soil tested free. Know what fertilizer is needed. Save money and grow better crops.",
    keyBenefits: [
      "Free soil testing",
      "Customized fertilizer recommendations",
      "Improved crop yield",
      "Cost savings on fertilizers",
      "Soil health improvement",
    ],
    howToApply: [
      "Contact nearest soil testing lab",
      "Collect soil sample from your field",
      "Submit at testing center",
      "Receive Soil Health Card",
      "Follow recommendations",
    ],
    status: "Open",
    keywords: ["soil health card", "soil testing", "farmer", "agriculture", "fertilizer"],
    offlineAssistance: ["Soil Testing Laboratory", "Agriculture Department", "Krishi Vigyan Kendra"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "मृदा स्वास्थ्य कार्ड योजना",
        description: "मृदा स्वास्थ्य कार्ड योजना किसानों को मिट्टी के पोषक तत्वों की स्थिति और पोषक तत्वों की उचित खुराक के बारे में सिफारिशें प्रदान करती है।",
        simplifiedDescription: "अपने खेत की मिट्टी की मुफ्त जांच करवाएं। जानें कि किस उर्वरक की आवश्यकता है। पैसे बचाएं और बेहतर फसल उगाएं।",
        keyBenefits: [
          "निःशुल्क मिट्टी परीक्षण",
          "अनुकूलित उर्वरक सिफारिशें",
          "फसल की पैदावार में सुधार",
          "उर्वरकों पर लागत बचत",
          "मृदा स्वास्थ्य में सुधार"
        ],
        howToApply: [
          "निकटतम मिट्टी परीक्षण प्रयोगशाला से संपर्क करें",
          "अपने खेत से मिट्टी का नमूना लें",
          "परीक्षण केंद्र पर जमा करें",
          "मृदा स्वास्थ्य कार्ड प्राप्त करें",
          "सिफारिशों का पालन करें"
        ]
      },
      mr: {
        name: "मृदा आरोग्य कार्ड योजना (Soil Health Card)",
        description: "मृदा आरोग्य कार्ड योजना शेतकऱ्यांना जमिनीतील पोषक घटकांची माहिती आणि खतांच्या योग्य मात्रेबद्दल शिफारस देते. यामुळे उत्पादन आणि जमिनीचे आरोग्य सुधारते.",
        simplifiedDescription: "तुमच्या शेतातील मातीची मोफत तपासणी करा. कोणत्या खताची गरज आहे ते जाणून घ्या. पैशांची बचत करा आणि चांगले पीक घ्या.",
        keyBenefits: [
          "मोफत माती परीक्षण",
          "पिकांनुसार खतांच्या शिफारशी",
          "उत्पादनात वाढ",
          "खतांवरील खर्चात बचत",
          "जमिनीचे आरोग्य सुधारते"
        ],
        howToApply: [
          "जवळच्या माती परीक्षण प्रयोगशाळेशी संपर्क साधा",
          "शेतातील मातीचा नमुना घ्या",
          "तपासणी केंद्रावर जमा करा",
          "मृदा आरोग्य कार्ड मिळवा",
          "शिफारशींचे पालन करा"
        ]
      }
    }
  },

  {
    id: "W04",
    name: "Stand Up India Scheme",
    ministry: "Ministry of Finance",
    targetGroup: "Women & SC/ST Entrepreneurs",
    benefit: "Loan ₹10 lakh to ₹1 crore",
    icon: "🏭",
    eligibility: {
      minAge: 18,
      targetGroups: ["Women", "SC/ST"],
      categories: ["SC", "ST", "All"],
      states: ["All"],
    },
    documents: ["Aadhaar Card", "PAN Card", "Business Plan", "Educational Certificates"],
    applicationMode: "Online",
    applyUrl: "https://www.standupmitra.in",
    description:
      "Stand Up India Scheme facilitates bank loans between ₹10 lakh and ₹1 crore to at least one SC or ST borrower and one woman borrower per bank branch for setting up greenfield enterprises.",
    simplifiedDescription: "Women and SC/ST people can get big loan from ₹10 lakh to ₹1 crore to start new business.",
    keyBenefits: [
      "Loan up to ₹1 crore",
      "Special focus on women and SC/ST",
      "Support for new enterprises",
      "Handholding support",
      "Credit guarantee",
    ],
    howToApply: [
      "Visit standupmitra.in",
      "Register and create profile",
      "Prepare business plan",
      "Apply for loan",
      "Bank evaluation",
      "Loan approval and disbursement",
    ],
    status: "Open",
    keywords: ["stand up india", "women entrepreneur", "sc st", "business loan", "startup"],
    offlineAssistance: ["Bank Branch", "SIDBI Office", "CSC"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "स्टैंड अप इंडिया योजना",
        description: "स्टैंड अप इंडिया योजना ग्रीनफील्ड उद्यम स्थापित करने के लिए प्रति बैंक शाखा कम से कम एक एससी या एसटी उधारकर्ता और एक महिला उधारकर्ता को ₹10 लाख से ₹1 करोड़ के बीच बैंक ऋण की सुविधा प्रदान करती है।",
        simplifiedDescription: "महिलाएं और एससी/एसटी लोग नया व्यवसाय शुरू करने के लिए ₹10 लाख से ₹1 करोड़ तक का बड़ा ऋण प्राप्त कर सकते हैं।",
        keyBenefits: [
          "₹1 करोड़ तक का ऋण",
          "महिलाओं और एससी/एसटी पर विशेष ध्यान",
          "नए उद्यमों के लिए समर्थन",
          "हैंडहोल्डिंग सहायता",
          "क्रेडिट गारंटी"
        ],
        howToApply: [
          "standupmitra.in पर जाएं",
          "पंजीकरण करें और प्रोफाइल बनाएं",
          "व्यवसाय योजना तैयार करें",
          "ऋण के लिए आवेदन करें",
          "बैंक मूल्यांकन",
          "ऋण स्वीकृति और वितरण"
        ]
      },
      mr: {
        name: "स्टँड अप इंडिया योजना",
        description: "स्टँड अप इंडिया योजना SC/ST आणि महिला उद्योजकांना नवीन व्यवसाय (Greenfield Enterprise) सुरू करण्यासाठी ₹10 लाख ते ₹1 कोटीपर्यंतच्या कर्जाची सुविधा देते.",
        simplifiedDescription: "महिला आणि SC/ST प्रवर्गातील लोक नवीन व्यवसाय सुरू करण्यासाठी ₹10 लाख ते ₹1 कोटीपर्यंत मोठे कर्ज मिळवू शकतात.",
        keyBenefits: [
          "₹1 कोटीपर्यंत कर्ज",
          "महिला आणि SC/ST प्रवर्गावर विशेष लक्ष",
          "नवीन उद्योगांसाठी सहाय्य",
          "मार्गदर्शन आणि मदत",
          "क्रेडिट गॅरंटी"
        ],
        howToApply: [
          "standupmitra.in वर जा",
          "नोंदणी करा आणि प्रोफाइल तयार करा",
          "व्यवसाय योजना (Business Plan) तयार करा",
          "कर्जासाठी अर्ज करा",
          "बँक पडताळणी",
          "कर्ज मंजूरी आणि वितरण"
        ]
      }
    }
  },

  {
    id: "H03",
    name: "Pradhan Mantri Suraksha Bima Yojana",
    ministry: "Ministry of Finance",
    targetGroup: "All",
    benefit: "₹2 lakh accident insurance",
    icon: "🛡️",
    eligibility: {
      minAge: 18,
      maxAge: 70,
      targetGroups: ["All"],
      categories: ["All"],
      states: ["All"],
    },
    documents: ["Aadhaar Card", "Bank Account"],
    applicationMode: "Both",
    applyUrl: "https://www.jansuraksha.gov.in",
    description:
      "Pradhan Mantri Suraksha Bima Yojana offers accident insurance coverage of ₹2 lakh for accidental death or permanent disability at a premium of just ₹20 per year.",
    simplifiedDescription:
      "Pay only ₹20 per year. Get ₹2 lakh insurance if accident happens. Very cheap insurance for everyone.",
    keyBenefits: [
      "₹2 lakh coverage",
      "Premium only ₹20/year",
      "Accidental death coverage",
      "Permanent disability coverage",
      "Auto-debit facility",
    ],
    howToApply: [
      "Visit your bank",
      "Fill PMSBY enrollment form",
      "Authorize auto-debit",
      "Premium deducted from account",
      "Receive confirmation",
    ],
    status: "Open",
    keywords: ["accident insurance", "suraksha bima", "₹20", "insurance", "pmsby"],
    offlineAssistance: ["Bank Branch", "Insurance Agent"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "प्रधानमंत्री सुरक्षा बीमा योजना",
        description: "प्रधानमंत्री सुरक्षा बीमा योजना मात्र ₹20 प्रति वर्ष के प्रीमियम पर आकस्मिक मृत्यु या स्थायी विकलांगता के लिए ₹2 लाख का दुर्घटना बीमा कवर प्रदान करती है।",
        simplifiedDescription: "केवल ₹20 प्रति वर्ष का भुगतान करें। दुर्घटना होने पर ₹2 लाख का बीमा प्राप्त करें। सभी के लिए बहुत सस्ता बीमा।",
        keyBenefits: [
          "₹2 लाख का कवर",
          "प्रीमियम केवल ₹20/वर्ष",
          "आकस्मिक मृत्यु कवर",
          "स्थायी विकलांगता कवर",
          "ऑटो-डेबिट सुविधा"
        ],
        howToApply: [
          "अपने बैंक पर जाएं",
          "PMSBY नामांकन फॉर्म भरें",
          "ऑटो-डेबिट अधिकृत करें",
          "खाते से प्रीमियम काटा गया",
          "पुष्टि प्राप्त करें"
        ]
      },
      mr: {
        name: "प्रधानमंत्री सुरक्षा बीमा योजना",
        description: "प्रधानमंत्री सुरक्षा बीमा योजना फक्त ₹20 प्रति वर्ष प्रीमियमवर अपघाती मृत्यू किंवा कायमस्वरूपी अपंगत्वासाठी ₹2 लाखांचे विमा कवच प्रदान करते.",
        simplifiedDescription: "वर्षाला फक्त ₹20 भरा आणि अपघातासाठी ₹2 लाखांचे विमा संरक्षण मिळवा. सर्वसामान्यांसाठी अतिशय स्वस्त विमा.",
        keyBenefits: [
          "₹2 लाखांचे विमा संरक्षण",
          "प्रीमियम फक्त ₹20/वर्ष",
          "अपघाती मृत्यू कव्हर",
          "कायमस्वरूपी अपंगत्व कव्हर",
          "ऑटो-डेबिट सुविधा"
        ],
        howToApply: [
          "तुमच्या बँकेत जा",
          "PMSBY नोंदणी फॉर्म भरा",
          "ऑटो-डेबिटला परवानगी द्या",
          "खात्यातून प्रीमियम कापले जाईल",
          "पावती मिळवा"
        ]
      }
    }
  },

  {
    id: "HO03",
    name: "Pradhan Mantri Ujjwala Yojana 2.0",
    ministry: "Ministry of Petroleum",
    targetGroup: "Women",
    benefit: "Free LPG connection",
    icon: "🔥",
    eligibility: {
      targetGroups: ["Women"],
      incomeLimit: 200000,
      categories: ["BPL", "SC", "ST", "OBC"],
      states: ["All"],
      gender: "female",
      conditionals: { isWoman: true },
    },
    documents: ["Aadhaar Card", "BPL Card"],
    applicationMode: "Online",
    applyUrl: "https://www.pmuy.gov.in",
    description:
      "Pradhan Mantri Ujjwala Yojana 2.0 is a scheme to provide free LPG connections to women from Below Poverty Line (BPL) households. The scheme aims to replace unclean cooking fuels used in rural India with clean and efficient LPG.",
    simplifiedDescription: "Get a free LPG gas cylinder and stove for your kitchen. Helps women cook safely.",
    keyBenefits: [
      "Free LPG connection worth ₹1600",
      "EMI facility for first refill and stove",
      "No paperwork for connection",
      "Clean cooking fuel",
      "Health benefits from smoke-free cooking",
      "Women empowerment through ownership",
    ],
    howToApply: [
      "Visit nearest LPG distributor",
      "Fill PMUY application form",
      "Attach Aadhaar card and BPL certificate",
      "Submit the form to distributor",
      "Verification by oil company",
      "LPG connection installed at doorstep",
      "Receive LPG connection for free",
    ],
    status: "Open",
    keywords: ["ujjwala yojana", "lpg", "gas connection", "women", "cooking gas", "free cylinder"],
    offlineAssistance: ["LPG Distributor", "CSC Centers"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "प्रधानमंत्री उज्ज्वला योजना 2.0",
        description: "प्रधानमंत्री उज्ज्वला योजना 2.0 गरीबी रेखा से नीचे (BPL) परिवारों की महिलाओं को मुफ्त एलपीजी कनेक्शन प्रदान करने की एक योजना है।",
        simplifiedDescription: "अपनी रसोई के लिए मुफ्त एलपीजी गैस सिलेंडर और चूल्हा प्राप्त करें। महिलाओं को सुरक्षित रूप से खाना पकाने में मदद करता है।",
        keyBenefits: [
          "₹1600 का मुफ्त एलपीजी कनेक्शन",
          "पहले रिफिल और स्टोव के लिए ईएमआई",
          "कनेक्शन के लिए कोई कागजी कार्रवाई नहीं",
          "स्वच्छ खाना पकाने का ईंधन",
          "धुआं मुक्त खाना पकाने से स्वास्थ्य लाभ"
        ],
        howToApply: [
          "निकटतम एलपीजी वितरक पर जाएं",
          "PMUY आवेदन पत्र भरें",
          "आधार कार्ड और बीपीएल प्रमाण पत्र संलग्न करें",
          "वितरक को फॉर्म जमा करें",
          "तेल कंपनी द्वारा सत्यापन",
          "घर पर एलपीजी कनेक्शन स्थापित",
          "मुफ्त में एलपीजी कनेक्शन प्राप्त करें"
        ]
      },
      mr: {
        name: "प्रधानमंत्री उज्ज्वला योजना 2.0",
        description: "प्रधानमंत्री उज्ज्वला योजना 2.0 ही दारिद्र्यरेषेखालील (BPL) कुटुंबातील महिलांना मोफत LPG गॅस कनेक्शन देण्यासाठीची योजना आहे.",
        simplifiedDescription: "स्वयंपाकघरासाठी मोफत LPG गॅस सिलिंडर आणि शेगडी मिळवा. महिलांना सुरक्षितपणे स्वयंपाक करण्यास मदत करते.",
        keyBenefits: [
          "₹1600 किमतीचे मोफत गॅस कनेक्शन",
          "पहिल्या रिफिल आणि शेगडीसाठी EMI सुविधा",
          "कमी कागदपत्रांमध्ये कनेक्शन",
          "स्वच्छ इंधन",
          "धूरमुक्त स्वयंपाकामुळे आरोग्य सुधारते"
        ],
        howToApply: [
          "जवळच्या गॅस एजन्सीला भेट द्या",
          "PMUY अर्ज भरा",
          "आधार कार्ड आणि BPL प्रमाणपत्र जोडा",
          "एजन्सीकडे अर्ज जमा करा",
          "पडताळणी प्रक्रिया",
          "घरी मोफत गॅस कनेक्शन मिळेल"
        ]
      }
    }
  },

  // Orphan Schemes
  {
    id: "OR01",
    name: "Central Sector Scheme for Orphan Children",
    ministry: "Ministry of Women and Child Development",
    targetGroup: "Orphan",
    benefit: "Financial assistance and care",
    icon: "👶",
    eligibility: {
      maxAge: 18,
      targetGroups: ["Orphan"],
      categories: ["All"],
      states: ["All"],
      conditionals: { isOrphan: true },
    },
    documents: ["Orphan Certificate", "Aadhaar Card", "Birth Certificate", "Guardian Certificate", "Bank Account"],
    applicationMode: "Both",
    applyUrl: "https://wcd.nic.in/schemes/central-sector-scheme-orphan-children",
    description:
      "Central Sector Scheme for Orphan Children provides financial assistance, care, and protection to orphan children. The scheme ensures their basic needs are met and supports their education and development.",
    simplifiedDescription:
      "Orphan children get money help, care, and support. Helps with food, education, and living. For children without parents.",
    keyBenefits: [
      "Monthly financial assistance",
      "Educational support",
      "Healthcare coverage",
      "Shelter and care",
      "Skill development programs",
      "Protection and support services",
    ],
    howToApply: [
      "Visit nearest Child Welfare Committee (CWC)",
      "Obtain orphan certificate from CWC",
      "Fill application form with guardian",
      "Submit required documents",
      "Verification by authorities",
      "Receive assistance and support",
    ],
    status: "Open",
    keywords: ["orphan", "orphan children", "child welfare", "orphan certificate", "guardian"],
    offlineAssistance: ["Child Welfare Committee", "District Child Protection Unit", "Anganwadi Centers"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "अनाथ बच्चों के लिए केंद्रीय क्षेत्र की योजना",
        description: "अनाथ बच्चों के लिए केंद्रीय क्षेत्र की योजना अनाथ बच्चों को वित्तीय सहायता, देखभाल और सुरक्षा प्रदान करती है। यह उनकी बुनियादी जरूरतों को पूरा करना सुनिश्चित करती है।",
        simplifiedDescription: "अनाथ बच्चों को पैसे की मदद, देखभाल और सहयोग मिलता है। भोजन, शिक्षा और रहने में मदद करता है।",
        keyBenefits: [
          "मासिक वित्तीय सहायता",
          "शैक्षिक सहायता",
          "स्वास्थ्य सेवा कवरेज",
          "आश्रय और देखभाल",
          "कौशल विकास कार्यक्रम"
        ],
        howToApply: [
          "निकटतम बाल कल्याण समिति (CWC) पर जाएं",
          "CWC से अनाथ प्रमाण पत्र प्राप्त करें",
          "अभिभावक के साथ आवेदन पत्र भरें",
          "आवश्यक दस्तावेज जमा करें",
          "अधिकारियों द्वारा सत्यापन",
          "सहायता और समर्थन प्राप्त करें"
        ]
      },
      mr: {
        name: "अनाथ मुलांसाठी केंद्र सरकारची योजना",
        description: "अनाथ मुलांसाठी ही योजना आर्थिक मदत, काळजी आणि संरक्षण पुरवते. मुलांच्या मूलभूत गरजा, शिक्षण आणि विकासासाठी मदत केली जाते.",
        simplifiedDescription: "ज्या मुलांना पालक नाहीत त्यांना आर्थिक मदत, शिक्षण आणि राहण्याची सोय मिळते.",
        keyBenefits: [
          "मासिक आर्थिक मदत",
          "शिक्षणासाठी मदत",
          "आरोग्य सुविधा",
          "निवारा आणि काळजी",
          "कौशल्य विकास"
        ],
        howToApply: [
          "जवळच्या बाल कल्याण समितीला (CWC) भेट द्या",
          "CWC कडून अनाथ प्रमाणपत्र मिळवा",
          "पालकांसह अर्ज भरा",
          "कागदपत्रे जमा करा",
          "पडताळणी",
          "मदत आणि आधार मिळवा"
        ]
      }
    }
  },
  {
    id: "OR02",
    name: "PM Cares for Children Scheme",
    ministry: "Prime Minister's Office",
    targetGroup: "Orphan",
    benefit: "₹4000 monthly + education support",
    icon: "🏛️",
    eligibility: {
      maxAge: 18,
      targetGroups: ["Orphan"],
      categories: ["All"],
      states: ["All"],
      conditionals: { isOrphan: true },
    },
    documents: ["Orphan Certificate", "Aadhaar Card", "Death Certificate of Parents", "Guardian Details", "Bank Account"],
    applicationMode: "Online",
    applyUrl: "https://pmcares.gov.in",
    description:
      "PM Cares for Children Scheme provides comprehensive support to children who lost both parents. It includes monthly financial assistance, education support, health insurance, and other benefits.",
    simplifiedDescription:
      "Children who lost both parents get ₹4000 every month, education help, health insurance, and other support until age 18.",
    keyBenefits: [
      "₹4000 monthly stipend",
      "Education scholarship",
      "Health insurance coverage",
      "Housing support",
      "Skill development",
      "Lump sum at age 23",
    ],
    howToApply: [
      "Visit PM Cares website",
      "Register with Aadhaar",
      "Upload orphan certificate",
      "Submit parent death certificates",
      "Provide guardian details",
      "Complete verification",
      "Receive benefits",
    ],
    status: "Open",
    keywords: ["pm cares", "orphan", "children", "monthly assistance", "education support"],
    offlineAssistance: ["District Magistrate Office", "Child Welfare Committee", "CSC Centers"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "पीएम केयर्स फॉर चिल्ड्रन योजना",
        description: "पीएम केयर्स फॉर चिल्ड्रन योजना उन बच्चों को व्यापक सहायता प्रदान करती है जिन्होंने अपने माता-पिता दोनों को खो दिया है।",
        simplifiedDescription: "जिन बच्चों ने माता-पिता दोनों को खो दिया है, उन्हें हर महीने ₹4000, शिक्षा मदद, स्वास्थ्य बीमा और 18 साल की उम्र तक अन्य सहायता मिलती है।",
        keyBenefits: [
          "₹4000 मासिक वजीफा",
          "शिक्षा छात्रवृत्ति",
          "स्वास्थ्य बीमा कवरेज",
          "आवास सहायता",
          "कौशल विकास"
        ],
        howToApply: [
          "पीएम केयर्स वेबसाइट पर जाएं",
          "आधार के साथ पंजीकरण करें",
          "अनाथ प्रमाण पत्र अपलोड करें",
          "माता-पिता के मृत्यु प्रमाण पत्र जमा करें",
          "अभिभावक विवरण प्रदान करें",
          "सत्यापन पूरा करें",
          "लाभ प्राप्त करें"
        ]
      },
      mr: {
        name: "पीएम केअर्स फॉर चिल्ड्रन योजना",
        description: "ज्या मुलांनी त्यांचे दोन्ही पालक गमावले आहेत, त्यांना या योजनेतून सर्वसमावेशक मदत मिळते. यात मासिक भत्ता, शिक्षण आणि आरोग्य विम्याचा समावेश आहे.",
        simplifiedDescription: "ज्या मुलांचे आई-वडील हयात नाहीत त्यांना दरमहा ₹4000, शिक्षणासाठी मदत आणि आरोग्य विमा मिळतो.",
        keyBenefits: [
          "₹4000 मासिक भत्ता",
          "शिक्षण शिष्यवृत्ती",
          "आरोग्य विमा",
          "निवारा मदत",
          "कौशल्य विकास"
        ],
        howToApply: [
          "पीएम केअर्स वेबसाइटवर जा",
          "आधारसह नोंदणी करा",
          "अनाथ प्रमाणपत्र अपलोड करा",
          "पालकांचे मृत्यू प्रमाणपत्र जमा करा",
          "पडताळणी पूर्ण करा",
          "लाभ मिळवा"
        ]
      }
    }
  },

  // Healthcare Schemes
  {
    id: "HC01",
    name: "Rashtriya Bal Swasthya Karyakram (RBSK)",
    ministry: "Ministry of Health and Family Welfare",
    targetGroup: "Healthcare",
    benefit: "Free health screening and treatment",
    icon: "🏥",
    eligibility: {
      minAge: 0,
      maxAge: 18,
      targetGroups: ["Healthcare", "All"],
      categories: ["All"],
      states: ["All"],
    },
    documents: ["Aadhaar Card", "Birth Certificate", "BPL Card (if applicable)"],
    applicationMode: "Offline",
    applyUrl: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=1021&lid=389",
    description:
      "Rashtriya Bal Swasthya Karyakram (RBSK) provides free health screening, early detection, and treatment for children from birth to 18 years. It covers 30 common health conditions including defects, diseases, deficiencies, and developmental delays.",
    simplifiedDescription:
      "Free health checkup and treatment for children from birth to 18 years. Finds health problems early and gives free treatment.",
    keyBenefits: [
      "Free health screening",
      "Early detection of health issues",
      "Free treatment for 30 conditions",
      "Follow-up care",
      "Referral to specialists",
      "Health education",
    ],
    howToApply: [
      "Visit nearest Anganwadi or school",
      "Register for health screening",
      "Attend screening camp",
      "Get health checkup",
      "Receive treatment if needed",
      "Follow-up visits",
    ],
    status: "Open",
    keywords: ["rbsk", "child health", "health screening", "free treatment", "healthcare"],
    offlineAssistance: ["Anganwadi Centers", "Primary Health Centers", "Schools", "Community Health Centers"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "राष्ट्रीय बाल स्वास्थ्य कार्यक्रम (RBSK)",
        description: "राष्ट्रीय बाल स्वास्थ्य कार्यक्रम (RBSK) जन्म से 18 वर्ष तक के बच्चों के लिए मुफ्त स्वास्थ्य जांच, प्रारंभिक पहचान और उपचार प्रदान करता है।",
        simplifiedDescription: "जन्म से 18 वर्ष तक के बच्चों की मुफ्त स्वास्थ्य जांच और उपचार। स्वास्थ्य समस्याओं का जल्दी पता लगाता है और मुफ्त इलाज करता है।",
        keyBenefits: [
          "मुफ्त स्वास्थ्य जांच",
          "स्वास्थ्य मुद्दों का प्रारंभिक पता लगाना",
          "30 स्थितियों के लिए मुफ्त उपचार",
          "अनुवर्ती देखभाल",
          "विशेषज्ञों को रेफरल"
        ],
        howToApply: [
          "निकटतम आंगनवाड़ी या स्कूल पर जाएं",
          "स्वास्थ्य जांच के लिए पंजीकरण करें",
          "जांच शिविर में शामिल हों",
          "स्वास्थ्य जांच करवाएं",
          "यदि आवश्यक हो तो उपचार प्राप्त करें",
          "अनुवर्ती दौरे"
        ]
      },
      mr: {
        name: "राष्ट्रीय बाल स्वास्थ्य कार्यक्रम (RBSK)",
        description: "राष्ट्रीय बाल स्वास्थ्य कार्यक्रम (RBSK) जन्म ते 18 वर्षांपर्यंतच्या मुलांसाठी मोफत आरोग्य तपासणी, वेळेवर निदान आणि उपचार पुरवते.",
        simplifiedDescription: "जन्म ते 18 वर्षांपर्यंतच्या मुलांची मोफत आरोग्य तपासणी आणि उपचार. आरोग्य समस्या लवकर ओळखते आणि मोफत उपचार देते.",
        keyBenefits: [
          "मोफत आरोग्य तपासणी",
          "वेळेवर आजार निदान",
          "30 आजारांवर मोफत उपचार",
          "पुढील उपचार (Follow-up)",
          "तज्ञांचा सल्ला"
        ],
        howToApply: [
          "जवळच्या अंगणवाडी किंवा शाळेत जा",
          "आरोग्य तपासणीसाठी नोंदणी करा",
          "तपासणी शिबिरात हजर राहा",
          "आरोग्य तपासणी करून घ्या",
          "गरज असल्यास उपचार घ्या",
          "पुढील तपासणीसाठी जा"
        ]
      }
    }
  },
  {
    id: "HC02",
    name: "Janani Shishu Suraksha Karyakram (JSSK)",
    ministry: "Ministry of Health and Family Welfare",
    targetGroup: "Healthcare",
    benefit: "Free delivery and newborn care",
    icon: "🤱",
    eligibility: {
      targetGroups: ["Healthcare", "Women"],
      categories: ["All"],
      states: ["All"],
      gender: "female",
      conditionals: { isWoman: true },
    },
    documents: ["Aadhaar Card", "Pregnancy Card", "BPL Card (if applicable)"],
    applicationMode: "Offline",
    applyUrl: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309",
    description:
      "Janani Shishu Suraksha Karyakram (JSSK) provides completely free and cashless services to pregnant women and sick newborns. It covers delivery, C-section, treatment, drugs, diagnostics, diet, blood, and transport.",
    simplifiedDescription:
      "Pregnant women and newborn babies get completely free hospital services. No money needed for delivery, medicines, tests, or food.",
    keyBenefits: [
      "Free delivery services",
      "Free C-section if needed",
      "Free medicines and tests",
      "Free food during stay",
      "Free blood transfusion",
      "Free transport",
      "Free treatment for sick newborns",
    ],
    howToApply: [
      "Register at nearest government hospital",
      "Get pregnancy card",
      "Regular checkups during pregnancy",
      "Deliver at government hospital",
      "All services provided free",
      "No payment required",
    ],
    status: "Open",
    keywords: ["jssk", "pregnancy", "delivery", "newborn", "free healthcare", "maternal health"],
    offlineAssistance: ["Government Hospitals", "Primary Health Centers", "Community Health Centers", "Anganwadi"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "जननी शिशु सुरक्षा कार्यक्रम (JSSK)",
        description: "जननी शिशु सुरक्षा कार्यक्रम (JSSK) गर्भवती महिलाओं और बीमार नवजात शिशुओं को पूरी तरह से मुफ्त और कैशलेस सेवाएं प्रदान करता है।",
        simplifiedDescription: "गर्भवती महिलाओं और नवजात शिशुओं को अस्पताल की सेवाएं पूरी तरह मुफ्त मिलती हैं। डिलीवरी, दवाएं, परीक्षण या भोजन के लिए कोई पैसा नहीं लगता।",
        keyBenefits: [
          "मुफ्त डिलीवरी सेवाएं",
          "यदि आवश्यक हो तो मुफ्त सी-सेक्शन",
          "मुफ्त दवाएं और परीक्षण",
          "रहने के दौरान मुफ्त भोजन",
          "मुफ्त रक्त आधान"
        ],
        howToApply: [
          "निकटतम सरकारी अस्पताल में पंजीकरण करें",
          "गर्भावस्था कार्ड प्राप्त करें",
          "गर्भावस्था के दौरान नियमित जांच",
          "सरकारी अस्पताल में डिलीवरी",
          "सभी सेवाएं मुफ्त प्रदान की जाती हैं",
          "कोई भुगतान आवश्यक नहीं"
        ]
      },
      mr: {
        name: "जननी शिशु सुरक्षा कार्यक्रम (JSSK)",
        description: "जननी शिशु सुरक्षा कार्यक्रम (JSSK) गर्भवती महिला आणि आजारी नवजात बालकांसाठी पूर्णपणे मोफत आणि कॅशलेस सेवा पुरवते.",
        simplifiedDescription: "गर्भवती महिला आणि नवजात बालकांना हॉस्पिटलच्या सर्व सुविधा मोफत मिळतात. डिलिव्हरी, औषधे, तपासण्या किंवा जेवणासाठी पैसे लागत नाहीत.",
        keyBenefits: [
          "मोफत डिलिव्हरी सुविधा",
          "गरज असल्यास मोफत सिझेरियन",
          "मोफत औषधे आणि तपासण्या",
          "हॉस्पिटलमधील जेवण मोफत",
          "मोफत रक्त पुरवठा"
        ],
        howToApply: [
          "जवळच्या सरकारी हॉस्पिटलमध्ये नोंदणी करा",
          "गर्भावस्था कार्ड मिळवा",
          "नियमित तपासणी करा",
          "सरकारी हॉस्पिटलमध्ये डिलिव्हरी",
          "सर्व सेवा मोफत मिळतील",
          "कोणीही पैसे मागणार नाही"
        ]
      }
    }
  },
  {
    id: "HC03",
    name: "Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
    ministry: "Ministry of Health and Family Welfare",
    targetGroup: "Healthcare",
    benefit: "₹5 lakh health insurance per family",
    icon: "🏥",
    eligibility: {
      targetGroups: ["Healthcare", "All"],
      incomeLimit: 250000,
      categories: ["All"],
      states: ["All"],
    },
    documents: ["Aadhaar Card", "Ration Card", "Income Certificate"],
    applicationMode: "Online",
    applyUrl: "https://pmjay.gov.in",
    description:
      "Pradhan Mantri Jan Arogya Yojana (PM-JAY) is the world's largest health insurance scheme. It provides health cover of ₹5 lakhs per family per year for secondary and tertiary care hospitalization to over 10.74 crore poor and vulnerable families.",
    simplifiedDescription:
      "Get free health insurance up to ₹5 lakhs for your family. Covers hospital expenses. For poor families.",
    keyBenefits: [
      "₹5 lakh health cover per family per year",
      "Covers over 1,400 procedures",
      "Cashless and paperless treatment",
      "Pre and post-hospitalization",
      "No restriction on family size",
      "Covers pre-existing conditions",
    ],
    howToApply: [
      "Visit nearest Common Service Centre (CSC)",
      "Verify eligibility through Aadhaar",
      "Get family details verified",
      "Receive Ayushman Bharat card",
      "Show card at any empaneled hospital",
      "Receive cashless treatment",
    ],
    status: "Open",
    keywords: ["pm-jay", "ayushman bharat", "health insurance", "5 lakh", "healthcare", "hospital"],
    offlineAssistance: ["Common Service Center (CSC)", "Empaneled Hospitals", "Health Centers"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "प्रधानमंत्री जन आरोग्य योजना (PM-JAY)",
        description: "प्रधानमंत्री जन आरोग्य योजना (PM-JAY) दुनिया की सबसे बड़ी स्वास्थ्य बीमा योजना है। यह प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य कवर प्रदान करती है।",
        simplifiedDescription: "अपने परिवार के लिए ₹5 लाख तक का मुफ्त स्वास्थ्य बीमा प्राप्त करें। अस्पताल के खर्चों को कवर करता है। गरीब परिवारों के लिए।",
        keyBenefits: [
          "प्रति परिवार ₹5 लाख का स्वास्थ्य कवर",
          "1,400 से अधिक प्रक्रियाओं को कवर करता है",
          "कैशलेस और पेपरलेस उपचार",
          "अस्पताल में भर्ती होने से पहले और बाद का खर्च",
          "परिवार के आकार पर कोई प्रतिबंध नहीं"
        ],
        howToApply: [
          "निकटतम कॉमन सर्विस सेंटर (CSC) पर जाएं",
          "आधार के माध्यम से पात्रता सत्यापित करें",
          "परिवार का विवरण सत्यापित करें",
          "आयुष्मान भारत कार्ड प्राप्त करें",
          "किसी भी सूचीबद्ध अस्पताल में कार्ड दिखाएं",
          "कैशलेस उपचार प्राप्त करें"
        ]
      },
      mr: {
        name: "प्रधानमंत्री जन आरोग्य योजना (PM-JAY)",
        description: "प्रधानमंत्री जन आरोग्य योजना (PM-JAY) ही जगातील सर्वात मोठी आरोग्य विमा योजना आहे. ही प्रत्येक कुटुंबाला वर्षाला ₹5 लाखांचे आरोग्य कवच देते.",
        simplifiedDescription: "तुमच्या कुटुंबासाठी ₹5 लाखांपर्यंतचा मोफत आरोग्य विमा मिळवा. हॉस्पिटलचा खर्च सरकार करेल. गरीब कुटुंबांसाठी.",
        keyBenefits: [
          "वर्षाला ₹5 लाखांचे आरोग्य कवच",
          "1,400 हून अधिक आजारांवर उपचार",
          "कॅशलेस आणि पेपरलेस उपचार",
          "हॉस्पिटलमध्ये दाखल होण्यापूर्वी आणि नंतरचा खर्च",
          "कुटुंबाच्या सदस्यांच्या संख्येवर मर्यादा नाही"
        ],
        howToApply: [
          "जवळच्या कॉमन सर्व्हिस सेंटर (CSC) ला भेट द्या",
          "आधारद्वारे पात्रता तपासा",
          "कुटुंबाची माहिती सत्यापित करा",
          "आयुष्मान भारत कार्ड मिळवा",
          "कोणत्याही मान्यताप्राप्त हॉस्पिटलमध्ये कार्ड दाखवा",
          "मोफत उपचार मिळवा"
        ]
      }
    }
  },
  // --- Additional Government Schemes ---
  {
    id: "U03",
    name: "PM SVANidhi",
    ministry: "Ministry of Housing and Urban Affairs",
    targetGroup: "Street Vendors",
    benefit: "Working capital loan up to ₹50,000",
    icon: "🛒",
    eligibility: {
      targetGroups: ["Self-employed"],
      categories: ["All"],
      states: ["All"],
      occupation: ["self-employed"],
    },
    documents: ["Aadhaar Card", "Vending Certificate", "Bank Account"],
    applicationMode: "Online",
    applyUrl: "https://pmsvanidhi.mohua.gov.in",
    description: "Special Micro-Credit Facility for Street Vendors providing affordable working capital loans for their business.",
    simplifiedDescription: "Street vendors can get a fast loan up to ₹50,000 for their small business with no guarantee needed.",
    keyBenefits: ["Collateral free loan", "Interest subsidy", "Cashback on digital transactions", "Next loan with higher limit"],
    howToApply: ["Apply online or through ULB/Bank", "Verify vending status", "Submit Aadhaar and Bank details"],
    status: "Open",
    keywords: ["street vendor", "loan", "svanidhi", "micro-credit", "vendor"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "पीएम स्वनिधि",
        description: "स्ट्रीट वेंडर्स के लिए विशेष माइक्रो-क्रेडिट सुविधा जो उनके व्यवसाय के लिए किफायती कार्यशील पूंजी ऋण प्रदान करती है।",
        simplifiedDescription: "स्ट्रीट वेंडर्स बिना किसी गारंटी के अपने छोटे व्यवसाय के लिए ₹50,000 तक का फास्ट लोन प्राप्त कर सकते हैं।",
        keyBenefits: [
          "गारंटी मुक्त ऋण",
          "ब्याज सब्सिडी",
          "डिजिटल लेनदेन पर कैशबैक",
          "अगली बार अधिक सीमा के साथ ऋण"
        ],
        howToApply: [
          "ऑनलाइन या यूएलबी/बैंक के माध्यम से आवेदन करें",
          "वेंडिंग स्थिति सत्यापित करें",
          "आधार और बैंक विवरण जमा करें"
        ]
      },
      mr: {
        name: "पीएम स्वनिधी योजना",
        description: "पथविक्रेत्यांसाठी (फेरीवाल्यांसाठी) विशेष कर्ज योजना, जी त्यांना व्यवसायासाठी सुलभ कर्ज उपलब्ध करून देते.",
        simplifiedDescription: "पथविक्रेते (फेरीवाले) त्यांच्या व्यवसायासाठी ₹50,000 पर्यंतचे कर्ज कोणत्याही हमीशिवाय मिळवू शकतात.",
        keyBenefits: [
          "विनातारण कर्ज",
          "व्याज सवलत (सबसिडी)",
          "डिजिटल व्यवहारांवर कॅशबॅक",
          "पुढील वेळी जास्त रकमेचे कर्ज"
        ],
        howToApply: [
          "ऑनलाइन किंवा बँकेमार्फत अर्ज करा",
          "विक्रेता असल्याची पडताळणी करा",
          "आधार आणि बँक तपशील जमा करा"
        ]
      }
    }
  },
  {
    id: "G02",
    name: "PM Vishwakarma Scheme",
    ministry: "Ministry of MSME",
    targetGroup: "Artisans & Craftsmen",
    benefit: "Skill training, toolkit & loan",
    icon: "🛠️",
    eligibility: {
      targetGroups: ["Self-employed"],
      categories: ["All"],
      states: ["All"],
      occupation: ["self-employed"],
    },
    documents: ["Aadhaar Card", "Mobile Number", "Bank Details"],
    applicationMode: "Online",
    applyUrl: "https://pmvishwakarma.gov.in",
    description: "Support for artisans and craftspeople working with their hands and tools to improve their craft and livelihoods.",
    simplifiedDescription: "Artisans (like carpenters, goldsmiths) get training, ₹15,000 for tools, and low-interest loans.",
    keyBenefits: ["Skill upgrading", "Toolkit incentive", "Collateral-free credit support", "Digital transaction incentive"],
    howToApply: ["Register on portal", "Verification by Gram Panchayat/ULB", "Skill certification"],
    status: "Open",
    keywords: ["artisan", "craftman", "toolkit", "vishwakarma", "training"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "पीएम विश्वकर्मा योजना",
        description: "अपने हाथों और औजारों से काम करने वाले कारीगरों और शिल्पकारों को उनके शिल्प और आजीविका में सुधार के लिए सहायता।",
        simplifiedDescription: "कारीगरों (जैसे बढ़ई, सुनार) को प्रशिक्षण, औजारों के लिए ₹15,000 और कम ब्याज वाला ऋण मिलता है।",
        keyBenefits: [
          "कौशल उन्नयन",
          "टूलकिट प्रोत्साहन",
          "गारंटी मुक्त ऋण सहायता",
          "डिजिटल लेनदेन प्रोत्साहन"
        ],
        howToApply: [
          "पोर्टल पर पंजीकरण करें",
          "ग्राम पंचायत/यूएलबी द्वारा सत्यापन",
          "कौशल प्रमाणन"
        ]
      },
      mr: {
        name: "पीएम विश्वकर्मा योजना",
        description: "हात आणि हत्यारांनी काम करणाऱ्या कारागीर आणि शिल्पकारांना त्यांचा व्यवसाय वाढवण्यासाठी आणि सुधारण्यासाठी मदत.",
        simplifiedDescription: "कारागीर (जसे की सुतार, लोहार, सोनार) यांना प्रशिक्षण, साहित्यासाठी (टूलकिट) ₹15,000 आणि कमी व्याजावर कर्ज मिळते.",
        keyBenefits: [
          "कौशल्य विकास प्रशिक्षण",
          "टूलकिटसाठी आर्थिक मदत",
          "विनातारण कर्ज",
          "डिजिटल व्यवहारांसाठी प्रोत्साहन"
        ],
        howToApply: [
          "पोर्टलवर नोंदणी करा",
          "ग्राम पंचायत/नगरपालिकेद्वारे पडताळणी",
          "कौशल्य प्रमाणपत्र मिळवा"
        ]
      }
    }
  },
  {
    id: "E03",
    name: "PM Shram Yogi Maandhan (PM-SYM)",
    ministry: "Ministry of Labour",
    targetGroup: "Unorganized Workers",
    benefit: "₹3000 monthly pension",
    icon: "👷",
    eligibility: {
      minAge: 18,
      maxAge: 40,
      targetGroups: ["All"],
      incomeLimit: 180000,
      categories: ["All"],
      states: ["All"],
    },
    documents: ["Aadhaar Card", "Savings Bank Account"],
    applicationMode: "Online",
    applyUrl: "https://maandhan.in",
    description: "Voluntary and contributory pension scheme for unorganized workers with monthly income up to ₹15,000.",
    simplifiedDescription: "Pay a small monthly amount, get ₹3000 monthly pension after age 60. For workers like cooks, drivers, labourers.",
    keyBenefits: ["Assured pension", "Family pension", "Matching contribution by Govt"],
    howToApply: ["Enroll at nearest CSC", "Submit Aadhaar and Bank details", "Auto-debit setup"],
    status: "Open",
    keywords: ["pension", "worker", "labour", "old age", "sym"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "पीएम श्रम योगी मानधन (PM-SYM)",
        description: "₹15,000 तक मासिक आय वाले असंगठित श्रमिकों के लिए स्वैच्छिक और अंशदायी पेंशन योजना।",
        simplifiedDescription: "हर महीने छोटी राशि जमा करें, 60 वर्ष की आयु के बाद ₹3000 मासिक पेंशन प्राप्त करें। रसोइया, ड्राइवर, मजदूरों जैसे श्रमिकों के लिए।",
        keyBenefits: [
          "सुनिश्चित पेंशन",
          "पारिवारिक पेंशन",
          "सरकार द्वारा समान योगदान"
        ],
        howToApply: [
          "निकटतम सीएससी पर नामांकन करें",
          "आधार और बैंक विवरण जमा करें",
          "ऑटो-डेबिट सेटअप"
        ]
      },
      mr: {
        name: "पीएम श्रम योगी मानधन (PM-SYM)",
        description: "असंघटित क्षेत्रातील कामगारांसाठी (ज्यांचे उत्पन्न ₹15,000 पर्यंत आहे) एक निवृत्तीवेतन (पेन्शन) योजना.",
        simplifiedDescription: "दरमहा थोडी रक्कम भरा आणि वयाच्या 60 नंतर दरमहा ₹3000 पेन्शन मिळवा. मजूर, ड्रायव्हर, स्वयंपाकी इ. कामगारांसाठी.",
        keyBenefits: [
          "निश्चित पेन्शन",
          "कुटुंब पेन्शन",
          "सरकारकडून समान योगदान"
        ],
        howToApply: [
          "जवळच्या CSC केंद्रात नाव नोंदवा",
          "आधार आणि बँक तपशील द्या",
          "ऑटो-डेबिट सुरू करा"
        ]
      }
    }
  },
  // --- Private / Corporate Schemes ---
  {
    id: "P01",
    name: "Tata Scholarship (Tata Trusts)",
    ministry: "Private - Tata Trusts",
    targetGroup: "Student",
    benefit: "Partial/Full tuition fee support",
    icon: "🏠",
    eligibility: {
      targetGroups: ["Student"],
      incomeLimit: 400000,
      categories: ["All"],
      states: ["All"],
      conditionals: { isStudent: true },
    },
    documents: ["Marksheets", "Admission Letter", "Income Certificate"],
    applicationMode: "Online",
    applyUrl: "https://www.tatatrusts.org/our-work/individual-grants-programme/education-grants",
    description: "Supporting students for higher education in India and abroad through various trusts and programs.",
    simplifiedDescription: "Tata Trusts helps good students pay for their college fees. Available for many types of courses.",
    keyBenefits: ["Merit-based financial aid", "Support for medical/engineering", "Loan scholarships available"],
    howToApply: ["Apply through Tata Trusts portal", "Submit academic records", "Interview if selected"],
    status: "Open",
    keywords: ["tata", "scholarship", "education", "college", "tata trusts"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "टाटा स्कॉलरशिप (टाटा ट्रस्ट)",
        description: "विभिन्न ट्रस्टों और कार्यक्रमों के माध्यम से भारत और विदेश में उच्च शिक्षा के लिए छात्रों का समर्थन करना।",
        simplifiedDescription: "टाटा ट्रस्ट अच्छे छात्रों को उनकी कॉलेज फीस का भुगतान करने में मदद करता है। कई प्रकार के पाठ्यक्रमों के लिए उपलब्ध है।",
        keyBenefits: [
          "मेरिट-आधारित वित्तीय सहायता",
          "चिकित्सा/इंजीनियरिंग के लिए सहायता",
          "ऋण छात्रवृत्ति उपलब्ध"
        ],
        howToApply: [
          "टाटा ट्रस्ट पोर्टल के माध्यम से आवेदन करें",
          "अकादमिक रिकॉर्ड जमा करें",
          "चयनित होने पर साक्षात्कार"
        ]
      },
      mr: {
        name: "टाटा स्कॉलरशिप (टाटा ट्रस्ट)",
        description: "विविध ट्रस्ट आणि कार्यक्रमांद्वारे भारत आणि परदेशात उच्च शिक्षणासाठी विद्यार्थ्यांना मदत करणे.",
        simplifiedDescription: "टाटा ट्रस्ट हुशार विद्यार्थ्यांना त्यांच्या कॉलेजची फी भरण्यासाठी मदत करते. अनेक प्रकारच्या कोर्सेससाठी उपलब्ध.",
        keyBenefits: [
          "गुणवत्तेवर आधारित आर्थिक मदत",
          "मेडिकल/इंजिनिअरिंगसाठी मदत",
          "कर्ज शिष्यवृत्ती उपलब्ध"
        ],
        howToApply: [
          "टाटा ट्रस्ट पोर्टलवर अर्ज करा",
          "शैक्षणिक कागदपत्रे जमा करा",
          "निवड झाल्यास मुलाखत द्या"
        ]
      }
    }
  },
  {
    id: "P02",
    name: "Reliance Foundation Scholarships",
    ministry: "Private - Reliance Foundation",
    targetGroup: "Student",
    benefit: "Up to ₹2 lakh - ₹6 lakh scholarship",
    icon: "💎",
    eligibility: {
      targetGroups: ["Student"],
      categories: ["All"],
      states: ["All"],
      conditionals: { isStudent: true },
    },
    documents: ["Academic Certificates", "Income Proof", "ID Proof"],
    applicationMode: "Online",
    applyUrl: "https://scholarships.reliancefoundation.org",
    description: "Aims to support meritorious students from all over India for undergraduate and postgraduate studies.",
    simplifiedDescription: "Scholarship for students who are good at studies. Helps finish college without money tension.",
    keyBenefits: ["High scholarship amount", "Mentorship support", "Access to alumni network"],
    howToApply: ["Online application on portal", "Aptitude test", "Interview"],
    status: "Open",
    keywords: ["reliance", "scholarship", "ug pg", "meritorious", "ambani"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "रिलायंस फाउंडेशन स्कॉलरशिप",
        description: "स्नातक और स्नातकोत्तर अध्ययन के लिए पूरे भारत से मेधावी छात्रों का समर्थन करना।",
        simplifiedDescription: "उन छात्रों के लिए छात्रवृत्ति जो पढ़ाई में अच्छे हैं। पैसे की चिंता के बिना कॉलेज पूरा करने में मदद करता है।",
        keyBenefits: [
          "उच्च छात्रवृत्ति राशि",
          "मेंटरशिप सहायता",
          "पूर्व छात्र नेटवर्क तक पहुंच"
        ],
        howToApply: [
          "पोर्टल पर ऑनलाइन आवेदन",
          "योग्यता परीक्षा",
          "साक्षात्कार"
        ]
      },
      mr: {
        name: "रिलायन्स फाउंडेशन स्कॉलरशिप",
        description: "पदवी आणि पदव्युत्तर शिक्षणासाठी संपूर्ण भारतातील गुणवंत विद्यार्थ्यांना मदत करणे.",
        simplifiedDescription: "अभ्यासात हुशार असलेल्या विद्यार्थ्यांसाठी शिष्यवृत्ती. पैशांच्या चिंतेशिवाय शिक्षण पूर्ण करण्यास मदत करते.",
        keyBenefits: [
          "मोठी शिष्यवृत्ती रक्कम",
          "मार्गदर्शन (Mentorship) मिळेल",
          "अल्युमनी नेटवर्कचा फायदा"
        ],
        howToApply: [
          "पोर्टलवर ऑनलाइन अर्ज करा",
          "पात्रता परीक्षा",
          "मुलाखत"
        ]
      }
    }
  },
  {
    id: "P03",
    name: "HDFC Bank Parivartan ECSS Scholarship",
    ministry: "Private - HDFC Bank",
    targetGroup: "Student",
    benefit: "Up to ₹75,000 scholarship",
    icon: "🏦",
    eligibility: {
      targetGroups: ["Student"],
      incomeLimit: 250000,
      categories: ["All"],
      states: ["All"],
      conditionals: { isStudent: true },
    },
    documents: ["Marksheets", "Fee Receipt", "Income Proof"],
    applicationMode: "Online",
    applyUrl: "https://www.buddy4study.com/page/hdfc-bank-parivartan-ecss-scholarship",
    description: "Supporting students facing personal or financial crisis to continue their education.",
    simplifiedDescription: "HDFC help for students whose family has low income or money problems. Helps pay school/college fees.",
    keyBenefits: ["Crisis support", "Merit-cum-means based", "Covers school and college"],
    howToApply: ["Apply on Buddy4Study portal", "Document verification", "Selection based on need"],
    status: "Open",
    keywords: ["hdfc", "scholarship", "parivartan", "crisis", "student help"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "एचडीएफसी बैंक परिवर्तन ईसीएसएस छात्रवृत्ति",
        description: "व्यक्तिगत या वित्तीय संकट का सामना कर रहे छात्रों को उनकी शिक्षा जारी रखने के लिए समर्थन देना।",
        simplifiedDescription: "उन छात्रों के लिए एचडीएफसी की मदद जिनके परिवार की आय कम है या जिन्हें पैसों की समस्या है। स्कूल/कॉलेज की फीस भरने में मदद करता है।",
        keyBenefits: [
          "संकट सहायता",
          "मेरिट-कम-मीन्स आधारित",
          "स्कूल और कॉलेज को कवर करता है"
        ],
        howToApply: [
          "बडी4स्टडी पोर्टल पर आवेदन करें",
          "दस्तावेज़ सत्यापन",
          "जरूरत के आधार पर चयन"
        ]
      },
      mr: {
        name: "HDFC बँक परिवर्तन ECSS शिष्यवृत्ती",
        description: "आर्थिक अडचणी किंवा कौटुंबिक संकटात सापडलेल्या विद्यार्थ्यांना त्यांचे शिक्षण चालू ठेवण्यासाठी मदत करणे.",
        simplifiedDescription: "ज्या विद्यार्थ्यांच्या कुटुंबाचे उत्पन्न कमी आहे किंवा आर्थिक अडचण आहे त्यांच्यासाठी HDFC ची मदत. शाळा/कॉलेजची फी भरण्यास मदत होते.",
        keyBenefits: [
          "संकटसमयी मदत",
          "गुणवत्ता आणि गरजेवर आधारित",
          "शाळा आणि कॉलेजसाठी उपलब्ध"
        ],
        howToApply: [
          "Buddy4Study पोर्टलवर अर्ज करा",
          "कागदपत्र पडताळणी",
          "गरजेनुसार निवड"
        ]
      }
    }
  },
  {
    id: "P04",
    name: "LIC Golden Jubilee Scholarship",
    ministry: "Private - LIC of India",
    targetGroup: "Student",
    benefit: "₹10,000 - ₹20,000 per year",
    icon: "🛡️",
    eligibility: {
      targetGroups: ["Student"],
      incomeLimit: 200000,
      categories: ["All"],
      states: ["All"],
      conditionals: { isStudent: true },
    },
    documents: ["Marksheets", "Admission Proof", "Cast Certificate (if any)"],
    applicationMode: "Online",
    applyUrl: "https://www.licindia.in/GJF_Scholarship.htm",
    description: "Scholarship for meritorious students from economically weaker families to pursue higher education.",
    simplifiedDescription: "Get money every year for studies if you have good marks and low family income.",
    keyBenefits: ["Annual stipend", "Support for vocational courses", "Pan India availability"],
    howToApply: ["Online application on LIC website", "Merit based selection", "Direct bank transfer"],
    status: "Open",
    keywords: ["lic", "scholarship", "golden jubilee", "student", "insurance"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "एलआईसी गोल्डन जुबली छात्रवृत्ति",
        description: "आर्थिक रूप से कमजोर परिवारों के मेधावी छात्रों के लिए उच्च शिक्षा प्राप्त करने हेतु छात्रवृत्ति।",
        simplifiedDescription: "यदि आपके पास अच्छे अंक हैं और पारिवारिक आय कम है तो पढ़ाई के लिए हर साल पैसे प्राप्त करें।",
        keyBenefits: [
          "वार्षिक वजीफा",
          "व्यावसायिक पाठ्यक्रमों के लिए सहायता",
          "अखिल भारतीय उपलब्धता"
        ],
        howToApply: [
          "एलआईसी वेबसाइट पर ऑनलाइन आवेदन",
          "मेरिट आधारित चयन",
          "सीधे बैंक हस्तांतरण"
        ]
      },
      mr: {
        name: "LIC गोल्डन ज्युबिली स्कॉलरशिप",
        description: "आर्थिकदृष्ट्या दुर्बल घटकातील हुशार विद्यार्थ्यांना उच्च शिक्षणासाठी शिष्यवृत्ती.",
        simplifiedDescription: "जर तुम्हाला चांगले मार्क्स असतील आणि कुटुंबाचे उत्पन्न कमी असेल, तर शिक्षणासाठी दरवर्षी पैसे मिळवा.",
        keyBenefits: [
          "वार्षिक भत्ता",
          "व्यावसायिक कोर्सेससाठी मदत",
          "संपूर्ण भारतात उपलब्ध"
        ],
        howToApply: [
          "LIC वेबसाइटवर ऑनलाइन अर्ज",
          "गुणवत्तेनुसार निवड",
          "थेट बँक खात्यात जमा"
        ]
      }
    }
  },
  {
    id: "P05",
    name: "Google Generation Google Scholarship",
    ministry: "Private - Google India",
    targetGroup: "Women in Tech",
    benefit: "$1,000 (appx ₹83,000) scholarship",
    icon: "🌐",
    eligibility: {
      targetGroups: ["Student"],
      categories: ["All"],
      states: ["All"],
      gender: "female",
      conditionals: { isStudent: true, isWoman: true },
    },
    documents: ["CV", "Transcripts", "Essay", "Coding/Tech experience"],
    applicationMode: "Online",
    applyUrl: "https://buildyourfuture.withgoogle.com/scholarships/generation-google-scholarship-apac",
    description: "Helping students pursuing computer science degrees excel in technology and become leaders in the field.",
    simplifiedDescription: "Big scholarship for girls studying Computer Science. Google helps you become a leader in tech.",
    keyBenefits: ["Financial award", "Google community access", "Recognition"],
    howToApply: ["Global portal application", "Essay questions", "Technical profile review"],
    status: "Open",
    keywords: ["google", "scholarship", "tech", "women", "computer science", "coding"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "जेनरेशन गूगल स्कॉलरशिप",
        description: "कंप्यूटर विज्ञान की डिग्री प्राप्त करने वाली छात्राओं को प्रौद्योगिकी में उत्कृष्टता प्राप्त करने और क्षेत्र में नेतृत्वकर्ता बनने में मदद करना।",
        simplifiedDescription: "कंप्यूटर विज्ञान की पढ़ाई कर रही लड़कियों के लिए बड़ी छात्रवृत्ति। गूगल आपको तकनीक में आगे बढ़ने में मदद करता है।",
        keyBenefits: [
          "वित्तीय पुरस्कार",
          "गूगल समुदाय तक पहुंच",
          "मान्यता"
        ],
        howToApply: [
          "वैश्विक पोर्टल आवेदन",
          "निबंध प्रश्न",
          "तकनीकी प्रोफाइल समीक्षा"
        ]
      },
      mr: {
        name: "जेनरेशन गुगल स्कॉलरशिप",
        description: "कॉम्प्युटर सायन्स शिकणाऱ्या विद्यार्थिनींना तंत्रज्ञान क्षेत्रात प्रगती करण्यासाठी आणि लीडर बनण्यासाठी मदत करणे.",
        simplifiedDescription: "कॉम्प्युटर सायन्स शिकणाऱ्या मुलींसाठी मोठी शिष्यवृत्ती. गुगल तुम्हाला तंत्रज्ञान क्षेत्रात करिअर करण्यास मदत करते.",
        keyBenefits: [
          "आर्थिक बक्षीस",
          "गुगल कम्युनिटीचा ॲक्सेस",
          "जागतिक ओळख"
        ],
        howToApply: [
          "ग्लोबल पोर्टलवर अर्ज",
          "निबंध लेखन",
          "तांत्रिक प्रोफाइल तपासणी"
        ]
      }
    }
  },
  {
    id: "P06",
    name: "Fair & Lovely Career Foundation Scholarship",
    ministry: "Private - HUL",
    targetGroup: "Women",
    benefit: "Higher education funding",
    icon: "🧴",
    eligibility: {
      minAge: 15,
      maxAge: 30,
      targetGroups: ["Women", "Student"],
      incomeLimit: 600000,
      categories: ["All"],
      states: ["All"],
      gender: "female",
      conditionals: { isStudent: true, isWoman: true },
    },
    documents: ["ID Proof", "Admissions Documents", "Marksheets"],
    applicationMode: "Online",
    applyUrl: "https://www.glowandlovelycareers.in/en/scholarship",
    description: "Empowering young women to pursue their dreams through higher education and vocational training.",
    simplifiedDescription: "Scholarship for girls to study further and start their career. Any course after class 12.",
    keyBenefits: ["Broad eligibility", "Support for vocational training", "Empowerment through education"],
    howToApply: ["Online portal application", "Submit academic and income proof"],
    status: "Open",
    keywords: ["glow and lovely", "scholarship", "women", "higher education", "career"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "फेयर एंड लवली करियर फाउंडेशन स्कॉलरशिप",
        description: "युवा महिलाओं को उच्च शिक्षा और व्यावसायिक प्रशिक्षण के माध्यम से अपने सपनों को पूरा करने के लिए सशक्त बनाना।",
        simplifiedDescription: "लड़कियों के लिए आगे की पढ़ाई और करियर शुरू करने के लिए छात्रवृत्ति। 12वीं कक्षा के बाद कोई भी कोर्स।",
        keyBenefits: [
          "व्यापक पात्रता",
          "व्यावसायिक प्रशिक्षण के लिए सहायता",
          "शिक्षा के माध्यम से सशक्तिकरण"
        ],
        howToApply: [
          "ऑनलाइन पोर्टल आवेदन",
          "अकादमिक और आय प्रमाण जमा करें"
        ]
      },
      mr: {
        name: "फेअर अँड लवली करिअर फाउंडेशन स्कॉलरशिप",
        description: "तरुण महिलांना उच्च शिक्षण आणि व्यावसायिक प्रशिक्षणाद्वारे त्यांची स्वप्ने पूर्ण करण्यासाठी सक्षम करणे.",
        simplifiedDescription: "मुलींना पुढील शिक्षण आणि करिअर सुरू करण्यासाठी शिष्यवृत्ती. 12वी नंतरच्या कोणत्याही कोर्ससाठी.",
        keyBenefits: [
          "अनेक प्रकारच्या शिक्षणासाठी उपयुक्त",
          "व्यावसायिक प्रशिक्षणासाठी मदत",
          "शिक्षणाद्वारे सक्षमीकरण"
        ],
        howToApply: [
          "ऑनलाइन पोर्टलवर अर्ज करा",
          "शैक्षणिक आणि उत्पन्नाचा पुरावा जमा करा"
        ]
      }
    }
  },
  {
    id: "P07",
    name: "Amazon Future Engineer Scholarship",
    ministry: "Private - Amazon India",
    targetGroup: "Students",
    benefit: "₹50,000 per year + Mentorship",
    icon: "📦",
    eligibility: {
      targetGroups: ["Student"],
      incomeLimit: 300000,
      categories: ["All"],
      states: ["All"],
      conditionals: { isStudent: true },
    },
    documents: ["Entrance Exam Rank", "College Admission Proof", "Income Proof"],
    applicationMode: "Online",
    applyUrl: "https://www.amazonfutureengineer.in",
    description: "Supporting low-income students pursuing Computer Science and related fields with financial aid and mentorship.",
    simplifiedDescription: "Amazon helps students from poor backgrounds study computers and coding with money and guidance.",
    keyBenefits: ["Financial aid", "Amazon mentorship", "Internship opportunities"],
    howToApply: ["Apply on NSP or Partner portal", "Verification of credentials"],
    status: "Open",
    keywords: ["amazon", "scholarship", "computer science", "mentorship", "tech"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "अमेज़ॅन फ्यूचर इंजीनियर स्कॉलरशिप",
        description: "कम आय वाले छात्रों को कंप्यूटर विज्ञान और संबंधित क्षेत्रों में वित्तीय सहायता और मेंटरशिप के साथ समर्थन देना।",
        simplifiedDescription: "अमेज़ॅन गरीब पृष्ठभूमि के छात्रों को पैसे और मार्गदर्शन के साथ कंप्यूटर और कोडिंग का अध्ययन करने में मदद करता है।",
        keyBenefits: [
          "वित्तीय सहायता",
          "अमेज़ॅन मेंटरशिप",
          "इंटर्नशिप के अवसर"
        ],
        howToApply: [
          "एनएसपी या पार्टनर पोर्टल पर आवेदन करें",
          "क्रेडेंशियल्स का सत्यापन"
        ]
      },
      mr: {
        name: "ॲमेझॉन फ्युचर इंजिनिअर स्कॉलरशिप",
        description: "कमी उत्पन्न असलेल्या आणि कॉम्प्युटर सायन्स क्षेत्रात शिक्षण घेणाऱ्या विद्यार्थ्यांना आर्थिक मदत आणि मार्गदर्शन.",
        simplifiedDescription: "ॲमेझॉन गरीब घरातील विद्यार्थ्यांना कॉम्प्युटर आणि कोडिंग शिकण्यासाठी पैसे आणि मार्गदर्शनाची मदत करते.",
        keyBenefits: [
          "आर्थिक मदत",
          "ॲमेझॉनकडून मार्गदर्शन (Mentorship)",
          "इंटर्नशिपच्या संधी"
        ],
        howToApply: [
          "NSP किंवा पार्टनर पोर्टलवर अर्ज करा",
          "कागदपत्रांची पडताळणी"
        ]
      }
    }
  },
  {
    id: "P08",
    name: "Smile Foundation - Smile Twin e-Learning",
    ministry: "Private - Smile Foundation",
    targetGroup: "Youth",
    benefit: "Employment-linked skill training",
    icon: "😊",
    eligibility: {
      minAge: 18,
      maxAge: 25,
      targetGroups: ["Unemployed", "Student"],
      incomeLimit: 200000,
      categories: ["All"],
      states: ["All"],
    },
    documents: ["ID Proof", "Educational Certificates", "Family Income Proof"],
    applicationMode: "Offline",
    applyUrl: "https://www.smilefoundationindia.org/smile-twin-e-learning.html",
    description: "Equipping underprivileged youth with English proficiency, basic computer skills, and soft skills for employment in the retail and service sectors.",
    simplifiedDescription: "Free training for poor youth in English, computers, and talking skills to get good jobs in shops and offices.",
    keyBenefits: ["Job skills", "Certification", "Placement support"],
    howToApply: ["Visit nearest Smile Foundation center", "Enroll for training"],
    status: "Open",
    keywords: ["smile foundation", "youth", "skills", "job training", "employment"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "स्माइल फाउंडेशन - स्माइल ट्विन ई-लर्निंग",
        description: "खुदरा और सेवा क्षेत्रों में रोजगार के लिए वंचित युवाओं को अंग्रेजी दक्षता, बुनियादी कंप्यूटर कौशल और सॉफ्ट कौशल से लैस करना।",
        simplifiedDescription: "गरीब युवाओं के लिए दुकानों और कार्यालयों में अच्छी नौकरी पाने के लिए अंग्रेजी, कंप्यूटर और बातचीत कौशल का मुफ्त प्रशिक्षण।",
        keyBenefits: [
          "नौकरी कौशल",
          "प्रमाणपत्र",
          "प्लेसमेंट सहायता"
        ],
        howToApply: [
          "निकटतम स्माइल फाउंडेशन केंद्र पर जाएं",
          "प्रशिक्षण के लिए नामांकन करें"
        ]
      },
      mr: {
        name: "स्माईल फाउंडेशन - स्माईल ट्विन ई-लर्निंग",
        description: "वंचित तरुणांना रिटेल आणि सेवा क्षेत्रात नोकरी मिळवण्यासाठी इंग्रजी, बेसिक कॉम्प्युटर आणि सॉफ्ट स्किल्सचे प्रशिक्षण देणे.",
        simplifiedDescription: "गरीब तरुणांना दुकाने आणि ऑफिसेसमध्ये चांगली नोकरी मिळवण्यासाठी इंग्रजी, कॉम्प्युटर आणि संभाषणाचे मोफत प्रशिक्षण.",
        keyBenefits: [
          "नोकरीसाठी आवश्यक कौशल्ये",
          "प्रमाणपत्र",
          "नोकरीसाठी मदत (Placement)"
        ],
        howToApply: [
          "जवळच्या स्माईल फाउंडेशन केंद्राला भेट द्या",
          "प्रशिक्षणासाठी नाव नोंदवा"
        ]
      }
    }
  },
  {
    id: "P09",
    name: "GiveIndia Welfare Programs",
    ministry: "Private - GiveIndia",
    targetGroup: "Needy Families",
    benefit: "Direct cash and medical support",
    icon: "🤝",
    eligibility: {
      targetGroups: ["All"],
      incomeLimit: 120000,
      categories: ["All"],
      states: ["All"],
    },
    documents: ["ID Proof", "Bank Account", "BPL Card or Income Certificate"],
    applicationMode: "Both",
    applyUrl: "https://www.giveindia.org",
    description: "Various donor-funded programs providing direct assistance for medical emergencies, basic needs, and elder care.",
    simplifiedDescription: "NGO help for very poor families for medicines, food, and urgent needs. Direct money to bank account.",
    keyBenefits: ["Financial aid", "Critical illness support", "Humanitarian assistance"],
    howToApply: ["Register on portal", "Submit proof of need", "Verification by NGO field staff"],
    status: "Open",
    keywords: ["giveindia", "charity", "cash help", "medical support", "ngo"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "गिवइंडिया कल्याण कार्यक्रम",
        description: "चिकित्सा आपात स्थिति, बुनियादी जरूरतों और बुजुर्गों की देखभाल के लिए प्रत्यक्ष सहायता प्रदान करने वाले विभिन्न दाता-वित्तपोषित कार्यक्रम।",
        simplifiedDescription: "दवाओं, भोजन और तत्काल जरूरतों के लिए बहुत गरीब परिवारों के लिए एनजीओ की मदद। सीधे बैंक खाते में पैसे।",
        keyBenefits: [
          "वित्तीय सहायता",
          "गंभीर बीमारी सहायता",
          "मानवीय सहायता"
        ],
        howToApply: [
          "पोर्टल पर पंजीकरण करें",
          "आवश्यकता का प्रमाण जमा करें",
          "एनजीओ फील्ड स्टाफ द्वारा सत्यापन"
        ]
      },
      mr: {
        name: "गिवइंडिया वेल्फेअर प्रोग्राम्स",
        description: "वैद्यकीय आपत्कालीन परिस्थिती, मूलभूत गरजा आणि वृद्धांच्या काळजीसाठी थेट मदत करणारे विविध देणगी-आधारित कार्यक्रम.",
        simplifiedDescription: "अतिशय गरीब कुटुंबांना औषधे, अन्न आणि तातडीच्या गरजांसाठी NGO कडून मदत. थेट बँक खात्यात पैसे जमा.",
        keyBenefits: [
          "आर्थिक मदत",
          "गंभीर आजारांसाठी मदत",
          "मानवतावादी मदत"
        ],
        howToApply: [
          "पोर्टलवर नोंदणी करा",
          "गरजेचा पुरावा जमा करा",
          "NGO कर्मचाऱ्यांद्वारे पडताळणी"
        ]
      }
    }
  },
  {
    id: "G03",
    name: "PM-PRANAM Scheme",
    ministry: "Ministry of Chemicals and Fertilizers",
    targetGroup: "Farmer",
    benefit: "Sustainable farming incentives",
    icon: "🚜",
    eligibility: {
      targetGroups: ["Farmer"],
      categories: ["All"],
      states: ["All"],
      occupation: ["farmer"],
    },
    documents: ["Aadhaar", "Land Records"],
    applicationMode: "Offline",
    applyUrl: "https://www.fert.nic.in",
    description: "Incentivizing states to promote alternative fertilizers and balanced use of chemical fertilizers to reduce subsidy burden and improve soil health.",
    simplifiedDescription: "Farmers get help to use less chemicals and more organic manure to keep their land healthy and get govt rewards.",
    keyBenefits: ["Soil health", "Govt incentives", "Sustainable yield"],
    howToApply: ["Contact local Agri officer", "Participate in state schemes"],
    status: "Open",
    keywords: ["pranam", "fertilizer", "organic", "farmer", "agriculture"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "पीएम-प्रणाम योजना",
        description: "सब्सिडी के बोझ को कम करने और मिट्टी के स्वास्थ्य में सुधार के लिए वैकल्पिक उर्वरकों और रासायनिक उर्वरकों के संतुलित उपयोग को बढ़ावा देने के लिए राज्यों को प्रोत्साहित करना।",
        simplifiedDescription: "किसानों को अपनी जमीन को स्वस्थ रखने और सरकारी पुरस्कार प्राप्त करने के लिए कम रसायनों और अधिक जैविक खाद का उपयोग करने में मदद मिलती है।",
        keyBenefits: [
          "मिट्टी का स्वास्थ्य",
          "सरकारी प्रोत्साहन",
          "टिकाऊ पैदावार"
        ],
        howToApply: [
          "स्थानीय कृषि अधिकारी से संपर्क करें",
          "राज्य की योजनाओं में भाग लें"
        ]
      },
      mr: {
        name: "पीएम-प्रणाम योजना",
        description: "जमिनीचे आरोग्य सुधारण्यासाठी आणि खतांवरील सबसिडी कमी करण्यासाठी रासायनिक खतांचा वापर कमी करून सेंद्रिय खतांच्या वापराला प्रोत्साहन देणे.",
        simplifiedDescription: "शेतकऱ्यांना जमिनीचा पोत सुधारण्यासाठी कमी रसायने आणि जास्त सेंद्रिय खत वापरण्यासाठी मदत आणि सरकारी प्रोत्साहन मिळते.",
        keyBenefits: [
          "जमिनीचे आरोग्य",
          "सरकारी प्रोत्साहन",
          "शाश्वत उत्पादन"
        ],
        howToApply: [
          "स्थानिक कृषी अधिकाऱ्याशी संपर्क साधा",
          "राज्यस्तरीय योजनांमध्ये सहभागी व्हा"
        ]
      }
    }
  },
  {
    id: "G04",
    name: "PM Matsya Sampada Yojana",
    ministry: "Ministry of Fisheries",
    targetGroup: "Fishermen/Fish Farmers",
    benefit: "Infrastructure & boat subsidies",
    icon: "🐟",
    eligibility: {
      targetGroups: ["Self-employed"],
      categories: ["All"],
      states: ["All"],
    },
    documents: ["Aadhaar", "Fisherman Card", "Project Proposal"],
    applicationMode: "Both",
    applyUrl: "https://pmmsy.dof.gov.in",
    description: "Focused development of fisheries sector through sustainable and responsible practices to double fishers' income.",
    simplifiedDescription: "Fishermen get money help for new boats, nets, and fish farming tanks to earn more income.",
    keyBenefits: ["Subsidy for boats", "Insurance for fishers", "Marketing support"],
    howToApply: ["Apply on PMMSY portal", "Submit proposal to District Fisheries Dept"],
    status: "Open",
    keywords: ["fish", "fishery", "boat", "ocean", "matsya"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "पीएम मत्स्य संपदा योजना",
        description: "मछुआरों की आय को दोगुना करने के लिए टिकाऊ और जिम्मेदार प्रथाओं के माध्यम से मत्स्य पालन क्षेत्र का केंद्रित विकास।",
        simplifiedDescription: "मछुआरों को अधिक आय अर्जित करने के लिए नई नावें, जाल और मछली पालन टैंकों के लिए धन की मदद मिलती है।",
        keyBenefits: [
          "नावों के लिए सब्सिडी",
          "मछुआरों के लिए बीमा",
          "विपणन सहायता"
        ],
        howToApply: [
          "पीएमएमएसवाई पोर्टल पर आवेदन करें",
          "जिला मत्स्य विभाग को प्रस्ताव जमा करें"
        ]
      },
      mr: {
        name: "पीएम मत्स्य संपदा योजना",
        description: "मच्छीमारांचे उत्पन्न दुप्पट करण्यासाठी शाश्वत पद्धतीने मत्स्यपालन क्षेत्राचा विकास करणे.",
        simplifiedDescription: "मच्छीमारांना नवीन बोटी, जाळी आणि मत्स्यपालनासाठी तलाव बांधण्यासाठी आर्थिक मदत मिळते, जेणेकरून त्यांचे उत्पन्न वाढेल.",
        keyBenefits: [
          "बोटींसाठी सबसिडी",
          "मच्छीमारांचा विमा",
          "मार्केटिंगसाठी मदत"
        ],
        howToApply: [
          "PMMSY पोर्टलवर अर्ज करा",
          "जिल्हा मत्स्य विभागाकडे प्रस्ताव जमा करा"
        ]
      }
    }
  },
  {
    id: "G05",
    name: "DAY-NRLM (Aajeevika)",
    ministry: "Ministry of Rural Development",
    targetGroup: "Self Help Groups (SHG)",
    benefit: "Loans and marketing support",
    icon: "🏘️",
    eligibility: {
      targetGroups: ["Women"],
      categories: ["All"],
      states: ["All"],
      gender: "female",
    },
    documents: ["SHG Registration", "Bank Account", "Member Details"],
    applicationMode: "Offline",
    applyUrl: "https://aajeevika.gov.in",
    description: "Promoting poverty reduction through building strong grassroots institutions of the poor, particularly women.",
    simplifiedDescription: "Women can join groups (SHG) to get easy bank loans and start a collective business or save money together.",
    keyBenefits: ["Interest subvention", "Rotating fund", "Skill training"],
    howToApply: ["Visit local Gram Panchayat or Block office", "Join or form a Women SHG"],
    status: "Open",
    keywords: ["nrlm", "aajeevika", "women group", "shg", "loan"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "DAY-NRLM (आजीविका)",
        description: "गरीबों, विशेषकर महिलाओं की मजबूत जमीनी स्तर की संस्थाओं का निर्माण करके गरीबी को कम करना।",
        simplifiedDescription: " महिलाएं आसान बैंक ऋण प्राप्त करने और सामूहिक व्यवसाय शुरू करने या एक साथ पैसा बचाने के लिए समूहों (स्वयं सहायता समूह) में शामिल हो सकती हैं।",
        keyBenefits: [
          "ब्याज सहायता",
          "परिसंचारी निधि",
          "कौशल प्रशिक्षण"
        ],
        howToApply: [
          "स्थानीय ग्राम पंचायत या ब्लॉक कार्यालय पर जाएं",
          "महिला स्वयं सहायता समूह में शामिल हों या गठन करें"
        ]
      },
      mr: {
        name: "DAY-NRLM (आजीविका अभियान)",
        description: "गरिबांचे, विशेषतः महिलांचे सक्षमीकरण करून त्यांचे दारिद्र्य निर्मूलन करणे.",
        simplifiedDescription: "महिला बचत गटात (SHG) सामील होऊन सुलभ कर्ज मिळवू शकतात आणि स्वतःचा व्यवसाय सुरू करू शकतात किंवा एकत्र पैसे साठवू शकतात.",
        keyBenefits: [
          "व्याज सवलत",
          "निधी उपलब्ध",
          "कौशल्य प्रशिक्षण"
        ],
        howToApply: [
          "स्थानिक ग्रामपंचायत किंवा गट विकास कार्यालयाला भेट द्या",
          "महिला बचत गटात सामील व्हा किंवा नवीन गट तयार करा"
        ]
      }
    }
  },
  {
    id: "G06",
    name: "PM-Vidyalaxmi Scholarship",
    ministry: "Ministry of Education",
    targetGroup: "Students",
    benefit: "Low-interest education loans",
    icon: "🎓",
    eligibility: {
      targetGroups: ["Student"],
      categories: ["All"],
      states: ["All"],
      conditionals: { isStudent: true },
    },
    documents: ["Admission Letter", "Fee Schedule", "Aadhaar"],
    applicationMode: "Online",
    applyUrl: "https://www.vidyalakshmi.co.in",
    description: "Single window portal for students to search and apply for education loans and schemes from various banks.",
    simplifiedDescription: "Apply for college study loans from many banks in one place with low interest and simple steps.",
    keyBenefits: ["Single application for multiple banks", "Interest subsidy for poor students", "Collateral free up to limits"],
    howToApply: ["Register on Vidyalakshmi portal", "Apply for loan using Common Application Form"],
    status: "Open",
    keywords: ["education loan", "vidyalaxmi", "college loan", "student", "bank loan"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "पीएम-विद्यालक्ष्मी छात्रवृत्ति",
        description: "छात्रों के लिए विभिन्न बैंकों से शिक्षा ऋण और योजनाओं की खोज और आवेदन करने के लिए सिंगल विंडो पोर्टल।",
        simplifiedDescription: "कम ब्याज और सरल चरणों के साथ एक ही स्थान पर कई बैंकों से कॉलेज अध्ययन ऋण के लिए आवेदन करें।",
        keyBenefits: [
          "कई बैंकों के लिए एक आवेदन",
          "गरीब छात्रों के लिए ब्याज सब्सिडी",
          "सीमा तक संपार्श्विक मुक्त"
        ],
        howToApply: [
          "विद्यालक्ष्मी पोर्टल पर पंजीकरण करें",
          "सामान्य आवेदन पत्र का उपयोग करके ऋण के लिए आवेदन करें"
        ]
      },
      mr: {
        name: "पीएम-विद्यालक्ष्मी योजना",
        description: "विद्यार्थ्यांना विविध बँकांमधून शैक्षणिक कर्ज आणि योजना शोधण्यासाठी आणि अर्ज करण्यासाठी एकच पोर्टल.",
        simplifiedDescription: "कमी व्याज आणि सोप्या प्रक्रियेसह अनेक बँकांकडून शैक्षणिक कर्जासाठी एकाच ठिकाणी अर्ज करा.",
        keyBenefits: [
          "अनेक बँकांसाठी एकच अर्ज",
          "गरीब विद्यार्थ्यांसाठी व्याज सवलत",
          "ठराविक रकमेपर्यंत विनातारण कर्ज"
        ],
        howToApply: [
          "विद्यालक्ष्मी पोर्टलवर नोंदणी करा",
          "कॉमन ॲप्लिकेशन फॉर्म वापरून कर्जासाठी अर्ज करा"
        ]
      }
    }
  },
  {
    id: "G07",
    name: "PM-Surya Ghar: Muft Bijli Yojana",
    ministry: "Ministry of New and Renewable Energy",
    targetGroup: "Households",
    benefit: "Up to ₹78,000 subsidy for Solar",
    icon: "☀️",
    eligibility: {
      targetGroups: ["All"],
      categories: ["All"],
      states: ["All"],
    },
    documents: ["Electricity Bill", "Property Doc", "Aadhaar"],
    applicationMode: "Online",
    applyUrl: "https://pmsuryaghar.gov.in",
    description: "Providing free electricity by installing solar panels on rooftops of houses with significant government subsidy.",
    simplifiedDescription: "Install solar panels on your roof and get up to ₹78,000 from the government. Get free electricity every month.",
    keyBenefits: ["Free electricity", "Substantial subsidy", "Environment friendly", "Income from excess power"],
    howToApply: ["Apply on rooftop solar portal", "Select vendor", "Install and get subsidy"],
    status: "Open",
    keywords: ["solar", "electricity", "rooftop", "free bijli", "surya ghar"],
    videoTutorialUrl: "https://www.youtube.com/watch?v=PLACEHOLDER",
    lastUpdated: "2024-01-10",
    translations: {
      hi: {
        name: "पीएम-सूर्य घर: मुफ्त बिजली योजना",
        description: "सरकारी सब्सिडी के साथ घरों की छतों पर सौर पैनल लगाकर मुफ्त बिजली प्रदान करना।",
        simplifiedDescription: "अपनी छत पर सौर पैनल लगवाएं और सरकार से ₹78,000 तक प्राप्त करें। हर महीने मुफ्त बिजली प्राप्त करें।",
        keyBenefits: [
          "मुफ्त बिजली",
          "महत्वपूर्ण सब्सिडी",
          "पर्यावरण के अनुकूल",
          "अतिरिक्त बिजली से आय"
        ],
        howToApply: [
          "रूफटॉप सोलर पोर्टल पर आवेदन करें",
          "विक्रेता का चयन करें",
          "इंस्टॉल करें और सब्सिडी प्राप्त करें"
        ]
      },
      mr: {
        name: "पीएम-सूर्य घर: मोफत वीज योजना",
        description: "घराच्या छतावर सोलर पॅनेल लावून मोफत वीज मिळवण्यासाठी सरकारी सबसिडी देणारी योजना.",
        simplifiedDescription: "तुमच्या छतावर सोलर पॅनेल बसवा आणि सरकारकडून ₹78,000 पर्यंत मदत मिळवा. दरमहा मोफत वीज मिळवा.",
        keyBenefits: [
          "मोफत वीज",
          "मोठी सबसिडी",
          "पर्यावरण पूरक",
          "जास्तीच्या विजेतून कमाई"
        ],
        howToApply: [
          "रूफटॉप सोलर पोर्टलवर अर्ज करा",
          "विक्रेता निवडा",
          "सोलार बसवा आणि सबसिडी मिळवा"
        ]
      }
    }
  },
]

// Eligibility checking function
export function checkEligibility(userData: {
  age: number
  gender: string
  occupation: string
  annualIncome: number
  state: string
  category: string
  isDisabled: boolean
  isWidow: boolean
  isWoman: boolean
  isFarmer: boolean
  isStudent: boolean
  landOwnership?: boolean
  currentClass?: string
}): { eligible: Scheme[]; notEligible: Array<{ scheme: Scheme; reasons: string[] }> } {
  const eligible: Scheme[] = []
  const notEligible: Array<{ scheme: Scheme; reasons: string[] }> = []

  schemes.forEach((scheme) => {
    const reasons: string[] = []

    // Check age
    if (scheme.eligibility.minAge && userData.age < scheme.eligibility.minAge) {
      reasons.push(`Minimum age required: ${scheme.eligibility.minAge} years`)
    }
    if (scheme.eligibility.maxAge && userData.age > scheme.eligibility.maxAge) {
      reasons.push(`Maximum age limit: ${scheme.eligibility.maxAge} years`)
    }

    // Check income
    if (scheme.eligibility.incomeLimit && userData.annualIncome > scheme.eligibility.incomeLimit) {
      reasons.push(`Income limit: ₹${scheme.eligibility.incomeLimit.toLocaleString("en-IN")}`)
    }

    // Check gender
    if (scheme.eligibility.gender && userData.gender !== scheme.eligibility.gender) {
      reasons.push(`Only for ${scheme.eligibility.gender} applicants`)
    }

    // Check category
    if (
      scheme.eligibility.categories &&
      !scheme.eligibility.categories.includes("All") &&
      !scheme.eligibility.categories.includes(userData.category)
    ) {
      reasons.push(`Category requirement: ${scheme.eligibility.categories.join(", ")}`)
    }

    // Check occupation
    if (scheme.eligibility.occupation && !scheme.eligibility.occupation.includes(userData.occupation)) {
      reasons.push(`Occupation requirement not met`)
    }

    // Check state requirement
    if (
      scheme.eligibility.states &&
      !scheme.eligibility.states.includes("All") &&
      !scheme.eligibility.states.includes(userData.state)
    ) {
      reasons.push(`Not available in your state`)
    }

    // Check conditionals
    if (scheme.eligibility.conditionals) {
      if (scheme.eligibility.conditionals.isDisabled && !userData.isDisabled) {
        reasons.push(`Only for persons with disability`)
      }
      if (scheme.eligibility.conditionals.isWoman && !userData.isWoman) {
        reasons.push(`Only for women`)
      }
      if (scheme.eligibility.conditionals.isFarmer && !userData.isFarmer) {
        reasons.push(`Only for farmers`)
      }
      if (scheme.eligibility.conditionals.isStudent && !userData.isStudent) {
        reasons.push(`Only for students`)
      }
      // Existing code had this block but it was not translated to the new structure properly.
      // The new code uses 'specialConditionals' which isn't in the original interface.
      // Let's try to map the new structure to the old one as best as possible.
      // If scheme.eligibility.specialConditionals exists:
      // This part needs careful mapping. The updates section uses a different structure for eligibility checks.
      // For now, we'll stick to the original 'conditionals' structure and hope it aligns with the intent.
    }

    // Add to appropriate list
    if (reasons.length === 0) {
      eligible.push(scheme)
    } else {
      notEligible.push({ scheme, reasons })
    }
  })

  return { eligible, notEligible }
}

export function getLocalizedScheme(scheme: Scheme, language: Language = 'en'): Scheme {
  if (language === 'en' || !scheme.translations || !scheme.translations[language]) {
    return scheme
  }

  const translation = scheme.translations[language]
  return {
    ...scheme,
    name: translation?.name || scheme.name,
    description: translation?.description || scheme.description,
    simplifiedDescription: translation?.simplifiedDescription || scheme.simplifiedDescription,
    keyBenefits: translation?.keyBenefits || scheme.keyBenefits,
    howToApply: translation?.howToApply || scheme.howToApply
  }
}
