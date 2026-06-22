document.documentElement.classList.add('js-enabled');

const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll('header[id], main section[id]');
const languageToggle = document.querySelector('.language-toggle');
const initialLanguage = new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'zh';
let activeLanguage = 'zh';

function setNavState() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 24);
}

function closeNav() {
    document.body.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
    setNavToggleLabel(false);
}

navToggle?.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    setNavToggleLabel(isOpen);
});

navLinks.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;

        event.preventDefault();
        closeNav();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach((element) => {
    revealObserver.observe(element);
});

const navObserver = new IntersectionObserver((entries) => {
    const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (!visibleSections.length) return;

    const activeId = visibleSections[0].target.id;
    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
}, {
    threshold: [0.16, 0.32, 0.56],
    rootMargin: '-84px 0px -55% 0px'
});

sections.forEach((section) => {
    navObserver.observe(section);
});

window.addEventListener('scroll', setNavState, { passive: true });
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeNav();
});

const englishText = new Map(Object.entries({
    "跳转到主要内容": "Skip to main content",
    "高涵": "Gao Han",
    "公共经济学 · 城市经济学 · 土地财政": "Public Finance · Urban Economics · Land Finance",
    "中山大学应用经济学博士": "Ph.D. Candidate in Applied Economics, Sun Yat-sen University",
    "即将加入中山大学岭南学院做科研博士后，关注财税体制改革、地方政府行为与城市土地配置。": "Incoming Postdoctoral Researcher at Lingnan College, Sun Yat-sen University. My research focuses on fiscal reform, local government behavior, and urban land allocation.",
    "查看研究": "View Research",
    "下载简历": "Download CV (Chinese)",
    "邮件联系": "Email Me",
    "税制改革与地方政府行为": "Tax reform and local government behavior",
    "土地配置、城市空间与公共服务": "Land allocation, urban space, and public services",
    "文本分析与 AI/LLM 研究方法": "Text analysis and AI/LLM methods",
    "关于我": "About Me",
    "我即将加入中山大学岭南学院做科研博士后，研究方向为公共经济学与城市经济学。": "I will join Lingnan College, Sun Yat-sen University as a postdoctoral researcher. My research fields are public finance and urban economics.",
    "我来自湖北荆州，江河湖泊环绕的平原小镇。学习与工作之余，我喜欢逛展、拍照、打羽毛球、看电影和阅读，也会在小红书分享对学术科研的思考与感悟。": "I am from Jingzhou, Hubei, a small plain town surrounded by rivers and lakes. Outside research, I enjoy visiting exhibitions, photography, badminton, films, and reading. I also share reflections on academic research on Xiaohongshu.",
    "我的研究兴趣集中在地方财政激励、城市土地治理和非结构化文本数据的经济学应用。": "My research interests focus on local fiscal incentives, urban land governance, and economic applications of unstructured text data.",
    "公共经济学：财税体制改革、地方政府行为": "Public Finance: fiscal reform and local government behavior",
    "城市经济学：土地配置与土地利用、集聚经济": "Urban Economics: land allocation and use, and agglomeration economies",
    "文本分析：土地挂牌、拍卖出让公告和成交公告中的文本信息": "Text Analysis: information in land listing, auction, and transaction announcements",
    "数字方法：AI/LLM 在经济学研究中的应用": "Digital Methods: applications of AI/LLMs in economics research",
    "教育背景": "Education",
    "经济学博士": "Ph.D. in Economics",
    "中山大学 · 应用经济学": "Sun Yat-sen University · Applied Economics",
    "硕士研究生": "M.A. in International Business",
    "广东外语外贸大学 · 国际商务": "Guangdong University of Foreign Studies · International Business",
    "本科": "B.A.",
    "广东外语外贸大学 · 创新班-经济学与英语文学双学位": "Guangdong University of Foreign Studies · Dual Degree in Economics and English Literature",
    "研究领域": "Research Areas",
    "关注财税体制改革、财政压力与地方政府在土地市场中的行为选择。": "I study fiscal reform, fiscal pressure, and local governments' behavioral choices in land markets.",
    "研究城市土地配置、土地利用、公共服务供给与空间结构对经济活动的影响。": "I examine how urban land allocation, land use, public-service provision, and spatial structure affect economic activity.",
    "从土地挂牌、拍卖出让公告和成交公告中提取政策、合同与交易信息。": "I extract policy, contract, and transaction information from land listing, auction, and transaction announcements.",
    "探索生成式 AI 与大语言模型在政策文本、新闻公告等非结构化数据中的应用。": "I explore applications of generative AI and large language models to unstructured data, including policy texts and news announcements.",
    "学术论文": "Publications",
    "已发表论文": "Published Papers",
    "围绕电商平台的产业链：线上加强线下集聚的证据": "Industry Chains around an E-commerce Platform: Evidence that Online Platforms Reinforce Offline Agglomeration",
    "张莉、": "Zhang Li, ",
    "*（通讯作者）、陈强远": "* (corresponding author), Chen Qiangyuan",
    "*（通讯作者）": "* (corresponding author)",
    "《管理世界》待刊": "Forthcoming in Management World",
    "摘要与关键词": "Abstract & Keywords",
    "摘要：": "Abstract: ",
    "链主型电商平台如何重塑传统产业链？本文以全球领先的跨境电商平台希音（SHEIN）为例，通过深入的实地调研，并结合中国工商企业注册、广东省纺织服装行业汇算清缴以及企业业务工序文本等多维微观大数据，考察了链主型平台入驻对周边产业链集聚与韧性的影响。研究发现：SHEIN 的入驻显著加强了纺织服装企业在地理空间上的集聚，并呈现出影响随距离远近衰减，证明了数字时代地理邻近性在支撑“小单快反”模式中的重要性。在外部贸易冲击下，链主型平台通过强化产业链垂直分工、促进知识溢出及增强市场波动抵御能力，显著提升了周边企业的经营绩效与产业链韧性。": "How do platform leaders reshape traditional industrial chains? Taking SHEIN, a leading global cross-border e-commerce platform, as an example, this paper combines field research with multidimensional microdata on Chinese business registrations, tax settlements in Guangdong's textile and apparel sector, and firms' production-process texts. We examine the effects of platform entry on agglomeration and resilience in surrounding supply chains. SHEIN's entry significantly strengthens the spatial agglomeration of textile and apparel firms, with effects declining over distance. This finding demonstrates the importance of geographic proximity for supporting the small-batch, rapid-response model in the digital era. Amid external trade shocks, platform leadership substantially improves nearby firms' performance and supply-chain resilience by strengthening vertical specialization, facilitating knowledge spillovers, and enhancing resistance to market volatility.",
    "关键词：": "Keywords: ",
    "独角兽企业；SHEIN；集聚效应；跨境电商平台；链主企业": "unicorn firms; SHEIN; agglomeration effects; cross-border e-commerce platforms; platform leaders",
    "产业多样性与城市风险抵御能力": "Industrial Diversity and Urban Resilience",
    "李世刚、张梦悦、": "Li Shigang, Zhang Mengyue, ",
    "《财经问题研究》第2期": "Research on Financial and Economic Issues, no. 2",
    "关于优化城乡建设用地增减挂钩结余指标跨区域流转的建议": "Recommendations for Optimizing Interregional Transfers of Surplus Quotas under the Linking Policy for Increases and Decreases in Urban and Rural Construction Land",
    "张莉、黄伟、": "Zhang Li, Huang Wei, ",
    "、韩立彬": ", Han Libin",
    "《南方智库》决策参考第1期": "Southern Think Tank: Policy Reference, no. 1",
    "土地市场降温、财政支出结构变动与地方公共服务水平": "Cooling Land Markets, Changes in Fiscal Expenditure Structure, and Local Public Service Provision",
    "张莉、童一舟、": "Zhang Li, Tong Yizhou, ",
    "《财经问题研究》第11期": "Research on Financial and Economic Issues, no. 11",
    "工作论文与进展中研究": "Working Papers & Research in Progress",
    "终审": "Final Review",
    "税制改革与以地谋发展模式转型：供需分析和政策优化": "Tax Reform and the Transformation of Land-Driven Development: Supply-Demand Analysis and Policy Optimization",
    "合作者：张莉，杨海生": "Coauthored with Zhang Li and Yang Haisheng",
    "《统计研究》终审": "Final review at Statistical Research",
    "内容提要：": "Summary: ",
    "当前，新一轮财税体制改革意义重大，重塑地方政府的以地谋发展行为和激发市场主体的高质量发展迫在眉睫。“营改增”是我国财税体制现代化的重大改革，本文以“营改增”政策为准自然实验，基于土地市场网 2010 年至 2016 年的微观土地出让信息和匹配了地块的税收调查数据，实证检验了此改革如何影响产业用地市场的供需双方，以及基于机器学习方法提出政策优化具体方向。结果表明，相比其他城市，试点城市在政策推行后工业用地的出让面积显著减少了 10%，交易规模下降 7%，实际单价上升 5%，且效应在建设用地指标约束较强的城市中更为突出，在与服务业关联更紧密的行业以及质量较好的高等级地块更为明显。进一步地，采用因果路径分析考察了“财政激励效应”和“需求冲击效应”及二者的相对重要性，发现“营改增”使得制造业实际增值税率下降，这对政府而言是负向的财政激励，进而减少了出让工业用地培育增值税税源的动机；而在需求侧，这一税制改革使得制造业企业资源配置更合理，放缓了粗放式购置土地扩张厂房的动机，因此最终工业用地交易规模减少。最后，基于市场均衡处理效应框架的分析表明，工业用地的市场化交易与集约节约利用仍是未来改革的重点。本文的研究结论能为后续深化财税体制现代化改革以及城市土地配置发展目标提供优化方向。": "A new round of fiscal and tax reform is consequential for reshaping local governments' land-driven development strategies and promoting high-quality development. This paper treats the replacement of business tax with value-added tax (VAT) as a quasi-natural experiment. Using microdata on land transactions from 2010 to 2016 matched to tax-survey data, we empirically assess how the reform affected both supply and demand in industrial land markets and use machine-learning methods to identify directions for policy optimization. Relative to other cities, pilot cities experienced a 10% decrease in industrial land supplied, a 7% decline in transaction volume, and a 5% increase in real unit prices after implementation. These effects are more pronounced where construction-land quotas are tighter, in industries more closely related to services, and on higher-quality parcels. Causal-path analysis shows that the reform reduced manufacturers' effective VAT rates. For local governments, this weakened the fiscal incentive to supply industrial land to cultivate VAT revenue; on the demand side, it improved firms' resource allocation and reduced incentives for extensive land purchases and plant expansion. Consequently, industrial land transactions declined. A market-equilibrium treatment-effect framework further indicates that market-based transactions and intensive, economical land use remain priorities for future reform. These results inform the continued modernization of China's fiscal system and policy objectives for urban land allocation.",
    "税制改革；营改增；工业用地；因果路径分析；市场均衡下的处理效应": "tax reform; VAT reform; industrial land; causal-path analysis; treatment effects under market equilibrium",
    "外审": "External Review",
    "城市空间结构的微观基础：地块规模与本地消费活力": "The Microfoundations of Urban Spatial Structure: Parcel Size and Local Consumption Vitality",
    "合作者：张莉，吕谨伊": "Coauthored with Zhang Li and Lü Jinyi",
    "已投稿": "Submitted",
    "大地块的财政激励：开源与节流的双重视角": "Fiscal Incentives for Large Parcels: A Dual Perspective on Revenue Generation and Expenditure Control",
    "合作者：张莉，黎婉玉": "Coauthored with Zhang Li and Li Wanyu",
    "进行中": "Ongoing",
    "地理距离作为处理变量的因果推断：理论基础、方法前沿与实践规范": "Causal Inference with Geographic Distance as a Treatment Variable: Theory, Methodological Frontiers, and Practical Standards",
    "随着地理编码（geocoded）微观数据的普及，以“到某一地点的地理距离”界定处理状态、考察其对邻近单元影响的研究设计，在经济学经验研究中日益普遍，广泛应用于污染、交通、城市更新、产业集群与企业区位等议题。然而，如何依据距离合理界定处理组与控制组、距离效应的理论基础何在，相关方法仍缺乏系统梳理。本文以潜在结果框架与“基于设计”（design-based）的研究范式为统一基础，澄清“空间处理”的概念内涵与识别假设，系统梳理距离缓冲区、环形法、距离梯度、空间双重差分、邻里固定效应与处理分配建模等主流方法，并结合蒙特卡洛模拟与图示介绍非参数处理效应曲线估计、反事实候选地点的机器学习构造、基于设计的标准误等前沿进展。在此基础上，本文给出一套可操作的“标准化操作流程”与“可行性检验”清单，回顾权威中英文期刊的应用实践，剖析处理环与控制环设定任意、控制组溢出污染与不可比、对照组构造不当、空间相关推断失当等常见误区，并提出相应的解决方案，以期为相关经验研究提供方法论参考。": "As geocoded microdata become increasingly available, empirical economics has made growing use of research designs that define treatment by geographic distance to a location and assess effects on nearby units. Such designs are applied to pollution, transportation, urban renewal, industrial clusters, and firm location. Yet the theoretical basis for distance effects and principled choices of treatment and control groups remain insufficiently systematized. This paper uses the potential-outcomes framework and a design-based research paradigm to clarify the concept of spatial treatment and its identification assumptions. It reviews major approaches, including distance buffers, ring methods, distance gradients, spatial difference-in-differences, neighborhood fixed effects, and treatment-assignment modeling. Monte Carlo simulations and illustrations introduce frontier developments such as nonparametric treatment-effect curves, machine-learning construction of counterfactual candidate locations, and design-based standard errors. The paper then presents an operational standard workflow and feasibility checklist, reviews applications in leading Chinese and international journals, and addresses common pitfalls: arbitrary treatment and control rings, spillover contamination and lack of comparability in control groups, inappropriate comparison-group construction, and invalid spatially correlated inference.",
    "地理距离；空间处理变量；因果推断；空间双重差分；环形法": "geographic distance; spatial treatment variables; causal inference; spatial difference-in-differences; ring methods",
    "高质量发展目标下的公共服务：路径选择与机制分析": "Public Services under High-Quality Development Goals: Pathways and Mechanisms",
    "参与项目课题": "Research Projects",
    "参与": "Contributor",
    "用电大数据看城市经济活力": "Measuring Urban Economic Vitality with Electricity Big Data",
    "南方电网 · 2025 年 12 月 - 至今": "China Southern Power Grid · Dec. 2025 – present",
    "广东省十五五期间优化区域经济布局研究": "Optimizing Guangdong's Regional Economic Layout during the 15th Five-Year Plan",
    "中共广东省委政研室 · 2025 年 6 月 - 11 月": "Policy Research Office of the CPC Guangdong Provincial Committee · Jun.–Nov. 2025",
    "全球南方视角下印度之东盟政策演变的跨学科研究": "An Interdisciplinary Study of India's Evolving ASEAN Policy from a Global South Perspective",
    "中山大学研究生教育创新计划 · 2025 年 5 月 - 至今": "Sun Yat-sen University Graduate Education Innovation Program · May 2025 – present",
    "城中村改造相关财税政策及其影响研究": "Fiscal and Tax Policies for Urban Village Redevelopment and Their Effects",
    "广东省财政厅财政科研课题 · 2024 年 6 月": "Guangdong Provincial Department of Finance Research Project · Jun. 2024",
    "再造康鹭：广州最大的纺织产业片区如何转型升级": "Reinventing Kanglu: How Guangzhou's Largest Textile District Can Transform and Upgrade",
    "中国专业学位案例中心 · 2023 年 12 月": "China National Case Center for Professional Degrees · Dec. 2023",
    "荣誉奖励": "Honors & Awards",
    "中山大学 2026 届优秀毕业生": "Outstanding Graduate, Class of 2026, Sun Yat-sen University",
    "2026 年 5 月": "May 2026",
    "第五届发展经济学研究生论文大赛二等奖": "Second Prize, 5th Graduate Student Paper Competition in Development Economics",
    "2025 年 7 月 · 博士生组": "Jul. 2025 · Doctoral Division",
    "中山大学博士研究生一等奖学金": "First-Class Doctoral Scholarship, Sun Yat-sen University",
    "2022 - 2025 年": "2022–2025",
    "研究生暑期学校博士生优秀论文": "Outstanding Doctoral Paper, Graduate Summer School",
    "2023 年 8 月 · “新发展阶段的应用经济学”": "Aug. 2023 · Applied Economics in the New Development Stage",
    "广东外语外贸大学国际商务硕士专项学业奖学金": "Special Academic Scholarship for M.A. in International Business, Guangdong University of Foreign Studies",
    "2022 年 6 月 · 全院唯一": "Jun. 2022 · Sole recipient in the school",
    "广东外语外贸大学硕士研究生一等综合奖学金": "First-Class Comprehensive Scholarship for Master's Students, Guangdong University of Foreign Studies",
    "2020 年、2021 年": "2020 and 2021",
    "国际商务案例分析大赛校级二等奖": "Second Prize, University International Business Case Analysis Competition",
    "2021 年 7 月 · 一等奖空缺": "Jul. 2021 · No first prize awarded",
    "会议报告与学术活动": "Conference Presentations & Academic Activities",
    "第十一届中国财政学论坛": "11th China Public Finance Forum",
    "中南财经政法大学 · 湖北武汉": "Zhongnan University of Economics and Law · Wuhan, Hubei",
    "第十届财政学博士生创新论坛": "10th Doctoral Innovation Forum in Public Finance",
    "西南财经大学 · 四川成都": "Southwestern University of Finance and Economics · Chengdu, Sichuan",
    "2025 年留美经济学年会": "2025 Annual Conference of Chinese Economists in North America",
    "中山大学 · 广东广州": "Sun Yat-sen University · Guangzhou, Guangdong",
    "第五届发展经济学研究生论文大赛（获二等奖）": "5th Graduate Student Paper Competition in Development Economics (Second Prize)",
    "华中科技大学 · 湖北武汉": "Huazhong University of Science and Technology · Wuhan, Hubei",
    "第十届“中国财政学”论坛": "10th China Public Finance Forum",
    "西南财经大学 & 《经济研究》杂志社 · 四川成都": "Southwestern University of Finance and Economics & Economic Research Journal · Chengdu, Sichuan",
    "第十届组织经济学讨论会": "10th Workshop on Organizational Economics",
    "广州大学 · 广东广州": "Guangzhou University · Guangzhou, Guangdong",
    "第二届“地方政府高质量发展论坛”": "2nd Forum on High-Quality Development of Local Governments",
    "中山大学岭南学院 · 广东广州": "Lingnan College, Sun Yat-sen University · Guangzhou, Guangdong",
    "中国青年经济学家联谊会（YES）2024 年会": "2024 Annual Meeting of the Young Economists Society (YES)",
    "西北大学 · 陕西西安": "Northwest University · Xi'an, Shaanxi",
    "第九届“中国财政学”论坛": "9th China Public Finance Forum",
    "中央财经大学 & 《经济研究》杂志社 · 北京": "Central University of Finance and Economics & Economic Research Journal · Beijing",
    "中国青年经济学家联谊会（YES）2023 年会": "2023 Annual Meeting of the Young Economists Society (YES)",
    "云南大学 · 云南昆明": "Yunnan University · Kunming, Yunnan",
    "联系我": "Contact Me",
    "广东省广州市海珠区中山大学南校园善衡堂 S211": "Room S211, Shanheng Hall, South Campus, Sun Yat-sen University, Haizhu District, Guangzhou, Guangdong, China",
    "小红书": "Xiaohongshu (RED)",
    "© 2026 高涵. All rights reserved.": "© 2026 Gao Han. All rights reserved.",
    "最后更新：2026 年 6 月": "Last updated: June 2026"
}).map(([chinese, english]) => [chinese.trim(), english]));

const chineseText = new Map([...englishText].map(([chinese, english]) => [english.trim(), chinese]));

function setNavToggleLabel(isOpen) {
    if (!navToggle) return;
    const labels = activeLanguage === 'en'
        ? { open: 'Open navigation', close: 'Close navigation' }
        : { open: '打开导航', close: '关闭导航' };
    navToggle.setAttribute('aria-label', isOpen ? labels.close : labels.open);
}

function translateTextNodes(language) {
    const translations = language === 'en' ? englishText : chineseText;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            return node.parentElement?.closest('script, style, [data-no-translate]')
                ? NodeFilter.FILTER_REJECT
                : NodeFilter.FILTER_ACCEPT;
        }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
        const value = node.nodeValue;
        const text = value.trim();
        const translated = translations.get(text);
        if (!translated) return;

        const leading = value.match(/^\s*/)[0];
        const trailing = value.match(/\s*$/)[0];
        node.nodeValue = leading + translated + trailing;
    });
}

function updateLocalizedAttributes(language) {
    const isEnglish = language === 'en';
    const metadata = isEnglish
        ? {
            title: 'Gao Han - Economics Researcher',
            description: 'Gao Han is an economics researcher working on public finance, urban economics, land finance, land allocation, and digital methods.',
            ogDescription: 'Public finance, urban economics, land finance, and digital methods.'
        }
        : {
            title: '高涵 - 经济学研究者',
            description: '高涵，中山大学应用经济学博士，即将加入中山大学岭南学院做科研博士后，研究方向包括公共经济学、城市经济学、土地财政、土地配置与数字方法。',
            ogDescription: '公共经济学、城市经济学、土地财政与数字方法。'
        };

    document.documentElement.lang = isEnglish ? 'en' : 'zh-CN';
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.ogDescription);
    document.querySelector('.navbar')?.setAttribute('aria-label', isEnglish ? 'Primary navigation' : '主导航');
    document.querySelector('.logo')?.setAttribute('aria-label', isEnglish ? "Gao Han's homepage" : '高涵主页');
    document.querySelector('.avatar-photo')?.setAttribute('alt', isEnglish ? 'Portrait of Gao Han' : '高涵头像');
    document.querySelector('.hero-actions')?.setAttribute('aria-label', isEnglish ? 'Primary actions' : '主要操作');
    document.querySelector('.hero-highlights')?.setAttribute('aria-label', isEnglish ? 'Research overview' : '研究概览');
    document.querySelector('.profile-card')?.setAttribute('aria-label', isEnglish ? 'Education' : '教育背景');

    const navigationLabels = isEnglish
        ? { '#about': 'About', '#research': 'Research', '#publications': 'Papers', '#projects': 'Projects', '#awards': 'Honors', '#conferences': 'Talks', '#contact': 'Contact' }
        : { '#about': '关于', '#research': '研究', '#publications': '论文', '#projects': '项目', '#awards': '荣誉', '#conferences': '会议', '#contact': '联系' };
    navLinks.forEach((link) => {
        link.textContent = navigationLabels[link.getAttribute('href')];
    });

    const researchLabels = isEnglish
        ? ['Public Finance', 'Urban Economics', 'Text Analysis', 'Digital Methods']
        : ['公共经济学', '城市经济学', '文本分析', '数字方法'];
    document.querySelectorAll('.research-card h3').forEach((heading, index) => {
        heading.textContent = researchLabels[index];
    });

    if (languageToggle) {
        languageToggle.textContent = isEnglish ? '中文' : 'English';
        languageToggle.setAttribute('aria-label', isEnglish ? '切换至中文版' : 'Switch to English version');
        languageToggle.setAttribute('aria-pressed', String(isEnglish));
    }

    setNavToggleLabel(document.body.classList.contains('nav-open'));
}

function setLanguage(language, updateHistory = true) {
    const nextLanguage = language === 'en' ? 'en' : 'zh';
    if (nextLanguage !== activeLanguage) {
        translateTextNodes(nextLanguage);
        activeLanguage = nextLanguage;
    }

    updateLocalizedAttributes(nextLanguage);

    if (!updateHistory) return;
    const url = new URL(window.location.href);
    if (nextLanguage === 'en') {
        url.searchParams.set('lang', 'en');
    } else {
        url.searchParams.delete('lang');
    }
    window.history.pushState({}, '', url);
}

languageToggle?.addEventListener('click', () => {
    setLanguage(activeLanguage === 'en' ? 'zh' : 'en');
    closeNav();
});

window.addEventListener('popstate', () => {
    setLanguage(new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'zh', false);
});

setNavState();
setLanguage(initialLanguage, false);
