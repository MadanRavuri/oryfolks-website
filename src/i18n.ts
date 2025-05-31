import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome to OryFolks",
      about: "About Us",
      services: {
        title: "Our Core Services",
        description: "We provide flexible engineering talent solutions tailored to your evolving business needs.",
        fullTime: {
          title: "Full-time Engineers with BOT Vision",
          description: "Dedicated, long-term collaboration with top-tier bilingual engineers focused on your vision."
        },
        contract: {
          title: "Contract-Based Hiring",
          description: "Flexible, short-term contracts providing agile support for your project timelines."
        },
        project: {
          title: "Project-Based Teams",
          description: "Custom-fit teams for AI development, product architecture, and more — built for high-impact results."
        },
        viewAll: "View All Services",
        learnMore: "Learn more",
        botVision: {
          hero: {
            title: "BOT Vision",
            subtitle: "Transforming businesses through advanced robotics and strategic technology partnerships"
          },
          overview: {
            title: "Comprehensive BOT Vision Solutions",
            description: "Our BOT Vision services combine the strategic advantages of the Build-Operate-Transfer model with cutting-edge robotic vision technology, delivering comprehensive solutions for modern businesses."
          },
          features: {
            buildOperateTransfer: {
              title: "Build-Operate-Transfer Model",
              description: "Strategic approach for seamless project development and handover, ensuring smooth transition and knowledge transfer."
            },
            roboticVision: {
              title: "Robotic Vision Systems",
              description: "Advanced computer vision integration enabling robots to perceive and interpret their environment with high precision."
            },
            aiAutomation: {
              title: "AI-Powered Automation",
              description: "Cutting-edge artificial intelligence solutions for automated decision-making and process optimization."
            }
          },
          benefits: {
            title: "Why Choose Our BOT Vision Services?",
            description: "Experience the advantages of our comprehensive BOT Vision solutions, designed to drive innovation and efficiency in your business.",
            riskMitigation: {
              title: "Risk Mitigation",
              description: "Third-party vendors assume initial risks during development and operation phases."
            },
            acceleratedDevelopment: {
              title: "Accelerated Development",
              description: "Leverage specialized expertise to speed up development and deployment processes."
            },
            accessToExpertise: {
              title: "Access to Expertise",
              description: "Gain access to domain expertise and specialized skills not available in-house."
            }
          },
          expertise: {
            title: "Technical Expertise",
            description: "Our team of expert engineers brings extensive experience in both BOT model implementation and robotic vision systems.",
            botModel: {
              title: "BOT Model Implementation",
              items: {
                strategic: "Strategic project planning and execution",
                knowledge: "Knowledge transfer and documentation",
                quality: "Quality assurance and testing",
                project: "Project management and coordination"
              }
            },
            roboticVision: {
              title: "Robotic Vision Systems",
              items: {
                algorithm: "Computer vision algorithm development",
                machineLearning: "Machine learning model integration",
                sensor: "Sensor fusion and data processing",
                realTime: "Real-time vision system optimization"
              }
            }
          },
          cta: {
            title: "Ready to Transform Your Business?",
            description: "Contact us today to discuss how our BOT Vision solutions can help your organization achieve its goals.",
            button: "Get Started"
          }
        },
        itStaffing: {
          hero: {
            title: "IT Staffing Solutions",
            subtitle: "Connecting exceptional IT talent with innovative companies"
          },
          overview: {
            title: "Comprehensive IT Staffing Services",
            description: "We specialize in connecting top IT talent with leading companies, offering flexible staffing solutions that drive innovation and growth."
          },
          services: {
            permanent: {
              title: "Permanent Staffing",
              description: "Find the perfect long-term addition to your team with our comprehensive permanent staffing solutions."
            },
            contract: {
              title: "Contract Staffing",
              description: "Flexible contract-based staffing solutions to meet your project-specific needs and timelines."
            },
            global: {
              title: "Global Talent Pool",
              description: "Access a diverse network of skilled IT professionals from around the world."
            }
          },
          benefits: {
            title: "Why Choose Our IT Staffing Services?",
            description: "Experience the advantages of our comprehensive IT staffing solutions, designed to meet your unique talent needs.",
            precisionMatching: {
              title: "Precision Matching",
              description: "Our advanced matching algorithms ensure the perfect fit for your technical requirements and company culture."
            },
            qualityAssurance: {
              title: "Quality Assurance",
              description: "Rigorous screening and verification processes to ensure you get only the best talent."
            },
            quickTurnaround: {
              title: "Quick Turnaround",
              description: "Fast recruitment process without compromising on quality or fit."
            }
          },
          expertise: {
            title: "Our Expertise",
            description: "We specialize in recruiting for a wide range of IT roles and technologies.",
            technicalRoles: {
              title: "Technical Roles",
              items: {
                developers: "Software Developers & Engineers",
                devops: "DevOps & Cloud Specialists",
                dataScientists: "Data Scientists & Analysts",
                cybersecurity: "Cybersecurity Experts"
              }
            },
            technologies: {
              title: "Technologies",
              items: {
                cloud: "Cloud Platforms (AWS, Azure, GCP)",
                programming: "Programming Languages & Frameworks",
                ai: "AI & Machine Learning",
                enterprise: "Enterprise Software Solutions"
              }
            }
          },
          cta: {
            title: "Ready to Build Your Dream Team?",
            description: "Contact us today to discuss your IT staffing needs and discover how we can help you find the perfect talent.",
            button: "Get Started"
          }
        }
      },
      story: {
        title: "Our Story",
        description: "At OryFolks, we are on a mission to bridge Japan and India through the power of language, technology, and inclusive talent. We specialize in enabling cross-border collaboration by equipping individuals with Japanese language skills and delivering world-class IT services and solutions.",
        secondParagraph: "What sets us apart is our commitment to tapping into the immense potential of talent from India's tier 2 and tier 3 cities—while also championing gender diversity in the tech workforce. By creating equal opportunities for women and underrepresented groups, we aim to build a more balanced, innovative, and socially responsible future.",
        thirdParagraph: "Whether you're a Japanese business exploring India's digital landscape, or an Indian enterprise reaching out to Japan, OryFolks is your trusted partner in transformation, inclusivity, and sustainable growth."
      },
      mission: {
        title: "Our Mission",
        points: [
          "Bridge Japan and India by enabling bilingual IT talent with language and cultural fluency.",
          "Deliver innovative IT services and solutions by leveraging skilled professionals from tier 2 and tier 3 cities in India.",
          "Promote inclusive growth by advancing gender diversity and creating equal opportunities in the technology sector."
        ]
      },
      vision: {
        title: "Our Vision",
        description: "To empower a new generation of bilingual IT professionals and enhance Japan's access to skilled talent—delivering innovative, inclusive solutions that connect cultures and drive global progress."
      },
      careers: {
        title: "Join Our Team",
        description: "Be part of a mission-driven organization where innovation meets purpose. Explore exciting career opportunities at OryFolks.",
        roles: {
          engineer: {
            title: "Software Engineer",
            type: "Full-Time · 0-3 Years Experience",
            description: "Join our engineering team to develop innovative solutions and contribute to cutting-edge projects. Work with modern technologies and grow your skills in a collaborative environment."
          },
          hr: {
            title: "HR Executive",
            type: "Full-Time · 0-3 Years Experience",
            description: "Support our growing team by managing recruitment, employee relations, and HR operations. Help create a positive work environment and contribute to our organizational culture."
          },
          receptionist: {
            title: "Receptionist",
            type: "Full-Time · 0-3 Years Experience",
            description: "Be the first point of contact for our organization. Manage front desk operations, handle communications, and provide administrative support to ensure smooth office operations."
          }
        },
        viewAll: "View All Open Roles",
        applyNow: "Apply Now"
      },
      cta: {
        title: "Ready to Transform Your Organization?",
        description: "Connect with our team to explore how OryFolks can help you achieve your goals and create lasting impact.",
        contact: "Contact Us",
        explore: "Explore Our Services"
      },
      navigation: {
        home: "Home",
        about: "About Us",
      services: "Services",
      careers: "Careers",
      events: "Events",
        contact: "Contact Us"
      },
      values: {
        title: "Our Core Values",
        description: "These principles guide our work and define our organizational culture.",
        items: {
          oneTeam: {
            title: "One Team, One Goal",
            description: "We unite as a single team, working together towards shared objectives with unwavering commitment and collaboration."
          },
          improvement: {
            title: "Continual Improvement",
            description: "We embrace a culture of constant learning and growth, always seeking ways to enhance our skills and processes."
          },
          transform: {
            title: "Transform Ideas into Impact",
            description: "We turn innovative concepts into tangible solutions that create meaningful change and drive real-world results."
          },
          inclusive: {
            title: "Leave No One Behind",
            description: "We are committed to inclusive growth, ensuring equal opportunities and support for all team members and communities."
          }
        }
      }
    }
  },
  'en-SG': {
    translation: {
      welcome: "Welcome to OryFolks",
      about: "About Us",
      services: {
        title: "Our Core Services",
        description: "We provide flexible engineering talent solutions tailored to your evolving business needs.",
        fullTime: {
          title: "Full-time Engineers with BOT Vision",
          description: "Dedicated, long-term collaboration with top-tier bilingual engineers focused on your vision."
        },
        contract: {
          title: "Contract-Based Hiring",
          description: "Flexible, short-term contracts providing agile support for your project timelines."
        },
        project: {
          title: "Project-Based Teams",
          description: "Custom-fit teams for AI development, product architecture, and more — built for high-impact results."
        },
        botVision: {
          hero: {
            title: "BOT Vision",
            subtitle: "Transforming businesses through advanced robotics and strategic technology partnerships"
          },
          overview: {
            title: "Comprehensive BOT Vision Solutions",
            description: "Our BOT Vision services combine the strategic advantages of the Build-Operate-Transfer model with cutting-edge robotic vision technology, delivering comprehensive solutions for modern businesses."
          },
          features: {
            buildOperateTransfer: {
              title: "Build-Operate-Transfer Model",
              description: "Strategic approach for seamless project development and handover, ensuring smooth transition and knowledge transfer."
            },
            roboticVision: {
              title: "Robotic Vision Systems",
              description: "Advanced computer vision integration enabling robots to perceive and interpret their environment with high precision."
            },
            aiAutomation: {
              title: "AI-Powered Automation",
              description: "Cutting-edge artificial intelligence solutions for automated decision-making and process optimization."
            }
          },
          benefits: {
            title: "Why Choose Our BOT Vision Services?",
            description: "Experience the advantages of our comprehensive BOT Vision solutions, designed to drive innovation and efficiency in your business.",
            riskMitigation: {
              title: "Risk Mitigation",
              description: "Third-party vendors assume initial risks during development and operation phases."
            },
            acceleratedDevelopment: {
              title: "Accelerated Development",
              description: "Leverage specialized expertise to speed up development and deployment processes."
            },
            accessToExpertise: {
              title: "Access to Expertise",
              description: "Gain access to domain expertise and specialized skills not available in-house."
            }
          },
          expertise: {
            title: "Technical Expertise",
            description: "Our team of expert engineers brings extensive experience in both BOT model implementation and robotic vision systems.",
            botModel: {
              title: "BOT Model Implementation",
              items: {
                strategic: "Strategic project planning and execution",
                knowledge: "Knowledge transfer and documentation",
                quality: "Quality assurance and testing",
                project: "Project management and coordination"
              }
            },
            roboticVision: {
              title: "Robotic Vision Systems",
              items: {
                algorithm: "Computer vision algorithm development",
                machineLearning: "Machine learning model integration",
                sensor: "Sensor fusion and data processing",
                realTime: "Real-time vision system optimization"
              }
            }
          },
          cta: {
            title: "Ready to Transform Your Business?",
            description: "Contact us today to discuss how our BOT Vision solutions can help your organization achieve its goals.",
            button: "Get Started"
          }
        },
        itStaffing: {
          hero: {
            title: "IT Staffing Solutions",
            subtitle: "Connecting exceptional IT talent with innovative companies"
          },
          overview: {
            title: "Comprehensive IT Staffing Services",
            description: "We specialize in connecting top IT talent with leading companies, offering flexible staffing solutions that drive innovation and growth."
          },
          services: {
            permanent: {
              title: "Permanent Staffing",
              description: "Find the perfect long-term addition to your team with our comprehensive permanent staffing solutions."
            },
            contract: {
              title: "Contract Staffing",
              description: "Flexible contract-based staffing solutions to meet your project-specific needs and timelines."
            },
            global: {
              title: "Global Talent Pool",
              description: "Access a diverse network of skilled IT professionals from around the world."
            }
          },
          benefits: {
            title: "Why Choose Our IT Staffing Services?",
            description: "Experience the advantages of our comprehensive IT staffing solutions, designed to meet your unique talent needs.",
            precisionMatching: {
              title: "Precision Matching",
              description: "Our advanced matching algorithms ensure the perfect fit for your technical requirements and company culture."
            },
            qualityAssurance: {
              title: "Quality Assurance",
              description: "Rigorous screening and verification processes to ensure you get only the best talent."
            },
            quickTurnaround: {
              title: "Quick Turnaround",
              description: "Fast recruitment process without compromising on quality or fit."
            }
          },
          expertise: {
            title: "Our Expertise",
            description: "We specialize in recruiting for a wide range of IT roles and technologies.",
            technicalRoles: {
              title: "Technical Roles",
              items: {
                developers: "Software Developers & Engineers",
                devops: "DevOps & Cloud Specialists",
                dataScientists: "Data Scientists & Analysts",
                cybersecurity: "Cybersecurity Experts"
              }
            },
            technologies: {
              title: "Technologies",
              items: {
                cloud: "Cloud Platforms (AWS, Azure, GCP)",
                programming: "Programming Languages & Frameworks",
                ai: "AI & Machine Learning",
                enterprise: "Enterprise Software Solutions"
              }
            }
          },
          cta: {
            title: "Ready to Build Your Dream Team?",
            description: "Contact us today to discuss your IT staffing needs and discover how we can help you find the perfect talent.",
            button: "Get Started"
          }
        }
      },
      careers: "Careers",
      events: "Events",
      contact: "Contact Us",
    },
  },
  ja: {
    translation: {
      welcome: "オリーフォークスへようこそ",
      about: "私たちについて",
      services: {
        title: "主要サービス",
        description: "変化するビジネスニーズに合わせた柔軟なエンジニアリング人材ソリューションを提供しています。",
        fullTime: {
          title: "BOTビジョンを持つ正社員エンジニア",
          description: "あなたのビジョンに焦点を当てた、一流のバイリンガルエンジニアとの長期的な専任協力。"
        },
        contract: {
          title: "契約ベースの採用",
          description: "プロジェクトのタイムラインに合わせた柔軟な短期契約によるアジャイルサポート。"
        },
        project: {
          title: "プロジェクトベースのチーム",
          description: "AI開発、製品アーキテクチャなど、高インパクトの結果を生み出すために構築されたカスタムフィットチーム。"
        },
        viewAll: "すべてのサービスを見る",
        learnMore: "詳細を見る"
      },
      story: {
        title: "私たちのストーリー",
        description: "OryFolksでは、言語、テクノロジー、包括的な人材の力を通じて日本とインドを結ぶことを使命としています。日本語スキルを身につけ、世界クラスのITサービスとソリューションを提供することで、国境を越えた協力を可能にすることに特化しています。",
        secondParagraph: "私たちの特徴は、インドの2次・3次都市の才能の莫大な可能性を引き出すことに加えて、テクノロジー業界でのジェンダー多様性を推進することです。女性や過小評価されているグループに平等な機会を提供することで、よりバランスの取れた、革新的で社会的に責任のある未来を構築することを目指しています。",
        thirdParagraph: "日本の企業がインドのデジタルランドスケープを探索する場合でも、インドの企業が日本に進出する場合でも、OryFolksは変革、包括性、持続可能な成長における信頼できるパートナーです。"
      },
      mission: {
        title: "私たちのミッション",
        points: [
          "言語と文化的流暢さを持つバイリンガルIT人材を育成することで日本とインドを結ぶ。",
          "インドの2次・3次都市の熟練した専門家を活用して、革新的なITサービスとソリューションを提供する。",
          "テクノロジーセクターでのジェンダー多様性を推進し、平等な機会を創出することで包括的な成長を促進する。"
        ]
      },
      vision: {
        title: "私たちのビジョン",
        description: "新しい世代のバイリンガルIT専門家を育成し、日本が熟練した人材にアクセスできるようにすることで、文化を結びつけ、グローバルな進歩を推進する革新的で包括的なソリューションを提供する。"
      },
      careers: {
        title: "チームに参加する",
        description: "イノベーションと目的が交差するミッション駆動型組織の一員になりましょう。OryFolksでのエキサイティングなキャリア機会を探索してください。",
        roles: {
          engineer: {
            title: "ソフトウェアエンジニア",
            type: "正社員・リモート",
            description: "世界中のコミュニティのデジタル変革を推進する堅牢でスケーラブルなプラットフォームの構築を支援してください。"
          },
          consultant: {
            title: "戦略コンサルタント",
            type: "正社員・ハイブリッド",
            description: "成長と回復力を促進する影響力のある戦略の設計と実装のために組織とパートナーシップを組みます。"
          },
          engagement: {
            title: "Responsable Engagement Communautaire",
            type: "契約・オフィス勤務",
            description: "意味のあるプログラムを通じて、コラボレーションを促進し、地域コミュニティに力を与えるイニシアチブをリードします。"
          }
        },
        viewAll: "すべての求人を見る",
        applyNow: "応募する"
      },
      cta: {
        title: "組織の変革の準備はできていますか？",
        description: "OryFolksがどのようにあなたの目標達成と持続可能な影響の創出を支援できるかを探るために、私たちのチームにご連絡ください。",
        contact: "お問い合わせ",
        explore: "サービスを探索する"
      },
      navigation: {
        home: "ホーム",
        about: "会社概要",
      services: "サービス",
        careers: "採用情報",
      events: "イベント",
        contact: "お問い合わせ"
      },
      values: {
        title: "私たちの基本価値観",
        description: "これらの原則が私たちの仕事を導き、組織文化を定義しています。",
        items: {
          oneTeam: {
            title: "一つのチーム、一つの目標",
            description: "私たちは一つのチームとして団結し、揺るぎない献身と協力のもと、共通の目標に向かって共に取り組みます。"
          },
          improvement: {
            title: "継続的な改善",
            description: "私たちは絶え間ない学習と成長の文化を受け入れ、常にスキルとプロセスの向上を目指しています。"
          },
          transform: {
            title: "アイデアをインパクトに変える",
            description: "革新的な概念を具体的な解決策に変え、意味のある変化を生み出し、現実の結果を推進します。"
          },
          inclusive: {
            title: "誰も取り残さない",
            description: "私たちは包括的な成長に取り組み、すべてのチームメンバーとコミュニティに平等な機会とサポートを提供します。"
          }
        }
      }
    }
  }
} as const;

// Get the stored language from localStorage or default to 'en'
const storedLanguage = localStorage.getItem('language') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: storedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Add a listener to save language changes to localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
