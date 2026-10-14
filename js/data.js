/**
 * Data module
 */

// Shared colour palette
const colours = {
    hotPink: '#ff0080',
    orange: '#ff6b00',
    gold: '#ffd700',
    green: '#00ff88',
    skyBlue: '#00bfff',
    purple: '#9370db',
    cyan: '#00aaff',
    red: '#ff4444',
    violet: '#aa44ff',
};

// Home page category colours
const homeCategoryColors = {
    Software: colours.hotPink,
    'Applied AI': colours.orange,
    Data: colours.gold,
    Cloud: colours.green,
    DevOps: colours.skyBlue,
    Security: colours.purple,
};

// Certification category colours
const certCategoryColors = {
    python: colours.green,
    cloud: colours.cyan,
    devops: colours.orange,
    security: colours.red,
    sysadmin: colours.violet,
};

// Home terminal content
const homeData = {
    name: 'Kurtis Massey',
    location: 'Manchester, United Kingdom',
    statusMessages: {
        initialised: 'System initialised.',
        ready: 'Ready.',
    },
};

// About section content
const aboutData = {
    bio: 'Full stack and applied AI engineer. I build retrieval systems and the evaluation harnesses that measure them, agent workflows, speech to text pipelines and named entity recognition models. Day to day I write Python and TypeScript, React and NextJS on the front end, plus Rust and SQL. Infrastructure is CI/CD, containers, IAM and tracing across AWS, Azure and Google Cloud. I lead a small engineering and data science team at Citizens Advice SORT.',
    award: {
        title: '[AWARD] Innovation of the Year (2024)',
        issuer: 'Citizens Advice Annual Conference',
        description:
            'A human in the loop, retrieval augmented generation tool for advisers. 80% advice approval rate, 1.5x increase in client resolution, supervision time down to under 4 minutes.',
    },
};

// Skills with categories
const skillCategories = {
    Languages: {
        color: colours.hotPink,
        skills: [
            'Python',
            'TypeScript',
            'Rust',
            'SQL',
            'JavaScript',
            'Node.js',
        ],
    },
    'AI/ML': {
        color: colours.orange,
        skills: [
            'LangChain',
            'LlamaIndex',
            'Huggingface',
            'Sklearn',
            'Pandas',
            'PyTorch',
        ],
    },
    Cloud: {
        color: colours.gold,
        skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Azure'],
    },
    Frameworks: {
        color: colours.green,
        skills: ['React', 'Angular', 'NextJS', 'Flask', 'Express'],
    },
    Architecture: {
        color: colours.skyBlue,
        skills: [
            'Microservices',
            'RESTful APIs',
            'Serverless',
            'Agile',
            'CI/CD',
            'Test-Driven Development',
            'Site Reliability Engineering',
        ],
    },
};

// Certifications data
const certifications = [
    {
        name: 'Python based Microservices',
        issuer: 'QA North America',
        date: 'Jun 2023',
        url: 'https://certificates.cloudacademy.com/c27503a234746817eb4c5ed6b16626f6f8791581.pdf',
        category: 'python',
        categoryLabel: 'Python',
    },
    {
        name: 'Pythonic Programming',
        issuer: 'QA North America',
        date: 'Jun 2023',
        url: 'https://certificates.cloudacademy.com/89c52d4c5ace75030ce4d603ce7feba849b20fdf.pdf',
        category: 'python',
        categoryLabel: 'Python',
    },
    {
        name: 'Serverless Python Web Development For AWS',
        issuer: 'QA North America',
        date: 'Jun 2023',
        url: 'https://certificates.cloudacademy.com/b933aaafb75d81b8ba192df015f0fd21a8ebcb71.pdf',
        category: 'cloud',
        categoryLabel: 'Cloud',
    },
    {
        name: 'Google Cloud Platform for Developers',
        issuer: 'QA North America',
        date: 'Sep 2022',
        url: 'https://certificates.cloudacademy.com/e138fd395835fbe903dc206291083e9bb6fd6b07.pdf',
        category: 'cloud',
        categoryLabel: 'Cloud',
    },
    {
        name: 'Site Reliability Engineering (SRE) Foundation',
        issuer: 'QA North America',
        date: 'Jun 2022',
        url: 'https://certificates.cloudacademy.com/f28201769f08a20e4bb84faadaa5f791185c8473.pdf',
        category: 'devops',
        categoryLabel: 'DevOps',
    },
    {
        name: 'Attacks and Persistence for Incident Handlers',
        issuer: 'Cybrary',
        date: 'Nov 2021',
        url: 'https://app.cybrary.it/courses/api/certificate/CC-65c5c20d-463e-424a-905d-fba3f4e7bbe4/view',
        category: 'security',
        categoryLabel: 'Security',
    },
    {
        name: 'Fundamental Windows Security Overview',
        issuer: 'Cybrary',
        date: 'Jul 2021',
        url: 'https://app.cybrary.it/courses/api/certificate/CC-9f06c5a6-79ac-46ca-8119-d88e73b57dcc/view',
        category: 'security',
        categoryLabel: 'Security',
    },
    {
        name: 'Fundamentals of Vulnerability Management',
        issuer: 'Cybrary',
        date: 'Jul 2021',
        url: 'https://app.cybrary.it/courses/api/certificate/CC-b9f7bf4a-5d6f-41c8-a9f2-8652efd0ab6f/view',
        category: 'security',
        categoryLabel: 'Security',
    },
    {
        name: 'Information Security Fundamentals',
        issuer: 'Cybrary',
        date: 'Jul 2021',
        url: 'https://app.cybrary.it/courses/api/certificate/CC-11b4e09b-dd2a-4358-9533-93ffcc5a6582/view',
        category: 'security',
        categoryLabel: 'Security',
    },
    {
        name: 'Malware Threats',
        issuer: 'Cybrary',
        date: 'Jul 2021',
        url: 'https://app.cybrary.it/courses/api/certificate/CC-1c77f121-2a21-49dd-9a7f-951d56401b29/view',
        category: 'security',
        categoryLabel: 'Security',
    },
    {
        name: 'Google Cloud Fundamentals: Core Infrastructure',
        issuer: 'Coursera',
        date: 'Apr 2021',
        url: 'https://www.coursera.org/account/accomplishments/certificate/NPPEUMU9P5UD',
        category: 'cloud',
        categoryLabel: 'Cloud',
    },
    {
        name: 'From Data to Insights with Google Cloud Platform Specialisation',
        issuer: 'Coursera',
        date: 'Dec 2020',
        url: 'https://www.coursera.org/account/accomplishments/specialization/certificate/LXJER4HNSQM3',
        category: 'cloud',
        categoryLabel: 'Cloud',
    },
    {
        name: 'G Suite Administration Specialisation',
        issuer: 'Coursera',
        date: 'Sep 2020',
        url: 'https://www.coursera.org/account/accomplishments/specialization/certificate/ZMCM696LV8AV',
        category: 'sysadmin',
        categoryLabel: 'System Admin',
    },
    {
        name: 'Google IT Support Specialisation',
        issuer: 'Coursera',
        date: 'Aug 2020',
        url: 'https://www.coursera.org/account/accomplishments/specialization/certificate/PG5LMSDZ4J26',
        category: 'sysadmin',
        categoryLabel: 'System Admin',
    },
];

// Experience data
const experienceData = [
    {
        company: 'Citizens Advice SORT',
        color: colours.green,
        roles: [
            {
                title: 'Head of Engineering',
                duration: 'Sep 2026 - Present · 2 mos',
                description:
                    'Lead five software engineers and a machine learning engineer. The team builds a suite of tools that support advisers and help them work more effectively. The work covers retrieval and evaluation, speech recognition, supervision and PII redaction. I set the engineering standards and still write and review the code. I also run the cloud platforms, security and prototyping.',
                tech: [
                    'Python',
                    'TypeScript',
                    'AWS CDK',
                    'Pulumi',
                    'GCP',
                    'Okta',
                ],
            },
            {
                title: 'Data, Digital and Innovation Manager',
                duration: 'Sep 2022 - Sep 2026 · 4 yrs',
                description:
                    'Lead a team of four building an adviser copilot and speech to text casenote automation. 60,000 casenotes generated so far, with write up time down by more than half. The work covers retrieval evaluation, data pipelines, infrastructure as code, continuous integration and deployment, container and auth hardening, and the logging and alarms behind model behaviour.',
                tech: [
                    'Python',
                    'Typescript',
                    'Azure',
                    'AWS',
                    'Google Cloud',
                    'OpenAI',
                    'Anthropic',
                    'LangChain',
                    'BigQuery',
                    'Pandas',
                    'DevOps',
                ],
            },
        ],
    },
    {
        company: 'Citizens Advice Manchester',
        color: colours.cyan,
        roles: [
            {
                title: 'IT and Digital Manager',
                duration: 'Oct 2021 - Sep 2022 · 1 yr',
                description:
                    'Managed a support team of 3, ensuring IT service uptime for 140+ staff. Deployed Azure Virtual Desktop, improved cyber security and delivered basic digital skills training to 70+ residents.',
                tech: [
                    'Cybersecurity',
                    'Team Leadership',
                    'Endpoint Management',
                    'Cloud Engineering',
                    'Cloud Security',
                ],
            },
            {
                title: 'Data and Digital Support Officer',
                duration: 'Oct 2020 - Oct 2021 · 1 yr 1 mo',
                description:
                    'Delivered IT Support, developed utterance and intent based chatbots in Google Cloud, built data dashboards using Looker Studio and BigQuery. Implemented a support desk system in the organisation.',
                tech: [
                    'Dialogflow',
                    'Google Cloud',
                    'BigQuery',
                    'Looker Studio',
                    'Freshdesk',
                    '1st Line Support',
                ],
            },
        ],
    },
];

// Contributions data
const contributions = [
    {
        repo: 'google/python-card-framework',
        desc: 'A framework for building card-based applications in Python',
        lang: 'Python',
        contribution: 'Streamlined package imports, test and README fixes',
        url: 'https://github.com/google/python-card-framework',
        category: 'open_source',
    },
    {
        repo: 'i-dot-ai/caddy-chatbot',
        desc: 'AI copilot for customer service functions',
        lang: 'Python',
        contribution:
            'OpenSearch retrieval, prompt and route migration to DynamoDB, supervisor streaming',
        url: 'https://github.com/i-dot-ai/caddy-chatbot',
        category: 'open_source',
    },
    {
        repo: 'aurelio-labs/semantic-router',
        desc: 'Semantic routing over embeddings for multi-modal data',
        lang: 'Python',
        contribution: 'Amazon Bedrock encoder support',
        url: 'https://github.com/aurelio-labs/semantic-router',
        category: 'open_source',
    },
    {
        repo: 'meridian',
        desc: 'UK local authority, region and postcode named entity recognition, built on spaCy',
        lang: 'Python',
        contribution: 'Author. Training and evaluation pipeline, tests, CI',
        url: 'https://github.com/kurtismassey/meridian',
        category: 'personal',
    },
    {
        repo: 'project-stargate',
        desc: "Evaluating the Stanford Research Institute's remote viewing sessions with multimodal Gemini",
        lang: 'TypeScript',
        contribution: 'Author',
        url: 'https://github.com/kurtismassey/project-stargate',
        category: 'personal',
    },
    {
        repo: 'constellation',
        desc: 'Agentic web research with cited answers, Rust and NextJS',
        lang: 'Rust',
        contribution: 'Author',
        url: 'https://github.com/kurtismassey/constellation',
        category: 'personal',
    },
];
