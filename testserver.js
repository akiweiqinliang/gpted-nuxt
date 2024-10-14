const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors'); // 导入cors中间件

const app = express();
const PORT = 5000;
// CORS配置
const corsOptions = {
    origin: '*', // 修改为你想要允许的域
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  // 使用CORS中间件
  app.use(cors(corsOptions));
// 中间件
app.use(morgan('dev')); // 日志中间件
app.use(bodyParser.json()); // 解析JSON请求体
app.use(bodyParser.urlencoded({ extended: true })); // 解析URL编码的请求体

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// 路由
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
// 假设这是库
const tenderList = [
    {
      id: 0,
      type: 0, // 0 => Award notice; 1 => Call for projects; 2 => Ongoing tenders; 3 => Abandoned tenders
      hadCollected: true,
      title: 'The goods required are for making up of patients <span class="highlight">clothing</span> for public hospitals patients',
      // detail: 'The goods required are for making up of patients <span class="highlight">clothing</span> for public hospitals,The goods required ',
      countryISO: 'ai',
      otherOrgISO: ['un',],
      release: '04 MAY 2024',
      deadline: '14 MAY 2024',
      cpv: 'CPV: 53 Construction structures and materials; auxiliary products to construction (except electric apparatus)',
      country: 'Saint Vincent And The Grenadines',
      region: 'Northeast Central Asia',
      winner: 'People\'s Government of Hoboksar Mongol Autonomous County and Shitoluogai TownPeople\'s Government of Hoboksar Mongol Autonomous County and Shitoluogai Town',

      table: {
        origin: {
          date: '30 June 2023',
          loan: 'ABD Loan No.3631-PHI improving Growth Corridors in Mindanao Road Sector Project(IGCMRSP)',
          contract:
            'ABD Loan No.3631-PHI improving Growth Corridors in Mindanao Road Sector Project(IGCMRSP)',
          deadline: '16 August 2023 at 10:00am (philippine time)',
        },
        zh: {
          date: '2023年6月30日',
          loan: 'ABD贷款第3631-PHI号 改善棉老公路部内增长走廊项目',
          contract: 'ABD贷款第3631-PHI号 改善棉老公路部内增长走廊项目',
          deadline: '2023年8月16日上午10点（菲律宾时间）',
        },
        en: {
          date: '30 June 2023',
          loan: 'ABD Loan No.3631-PHI improving Growth Corridors in Mindanao Road Sector Project(IGCMRSP)',
          contract:
            'ABD Loan No.3631-PHI improving Growth Corridors in Mindanao Road Sector Project(IGCMRSP)',
          deadline: '16 August 2023 at 10:00am (philippine time)',
        },
      },

      detail: {
        origin: `1. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

      2. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

      3. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
      One-Envelope bidding procedure.

      4. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:
      5. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

      6. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

      7. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
      One-Envelope bidding procedure.

      8. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:`,

        zh: `1. 菲律宾共和国已经从亚洲开发银行（ADB）获得资金，用于改善棉兰老岛道路部门增长走廊项目（IGCMRSP）的成本。该资金的一部分将用于上述合同的支付。投标对来自ADB符合资格来源国家的投标人开放。

    2. 公共工程与公路部（"雇主"）邀请符合资格的投标人提交密封投标，供应、交付、安装、配置、实施和支持人力资源信息系统（"设施"）。

    3. 将按照单阶段：一信封投标程序进行国际竞争性招标（ICB）。

    4. 只有具备招标文件中定义的以下关键资格的符合资格投标人才能参与此次招标。

      5. 菲律宾共和国已经从亚洲开发银行（ADB）获得资金，用于改善棉兰老岛道路部门增长走廊项目（IGCMRSP）的成本。该资金的一部分将用于上述合同的支付。投标对来自ADB符合资格来源国家的投标人开放。

      6. 公共工程与公路部（"雇主"）邀请符合资格的投标人提交密封投标，供应、交付、安装、配置、实施和支持人力资源信息系统（"设施"）。

      7. 将按照单阶段：一信封投标程序进行国际竞争性招标（ICB）。

      8. 只有具备招标文件中定义的以下关键资格的符合资格投标人才能参与此次招标。`,

        en: `1. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

      2. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

      3. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
      One-Envelope bidding procedure.

      4. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:
      5. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

      6. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

      7. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
      One-Envelope bidding procedure.

      8. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:`
      },

      docs: [
        {
          id: 0,
          type: 'docx',
          title: 'The goods required are for making up of patient\'s clothing for public hospitalsfor ublic hospitalsfor ublicabcwsdass hospitalsaafor...docx',
          size: '12.1MB',
          date: 'Jul 22, 2023',
        },
        {
          id: 1,
          type: 'docx',
          title: 'Tender Invitation for Construction Services_Project Specifications and Requirements Document.docx',
          size: '4.1MB',
          date: 'Jul 22, 2023',
        },
        {
          id: 2,
          type: 'pdf',
          title: 'The goods required are for making up of patient\'s clothing for public hospitalsfor.pdf',
          size: '831.5KB',
          date: 'Jul 22, 2023',
        },
        {
          id: 3,
          type: 'xlsx',
          title: 'The goods required are for making up of patient\'s clothing for public hospitalsfor.xlsx',
          size: '12.1MB',
          date: 'Jul 22, 2023',
        },
      ]
    },
    {
      id: 1,
      type: 2, // 0 => Award notice; 1 => Call for projects; 2 => Ongoing tenders; 3 => Abandoned tenders
      hadCollected: true,
      title: 'The goods required are for making up of patients <span class="highlight">clothing</span> for public hospitals patients',
      // detail: 'The goods required are for making up of patients <span class="highlight">clothing</span> for public hospitals,The goods required ',
      countryISO: 'ai',
      otherOrgISO: ['un',],
      release: '04 MAY 2024',
      deadline: '14 MAY 2024',
      cpv: 'CPV: 53 Construction structures and materials; auxiliary products to construction (except electric apparatus)',
      country: 'Saint Vincent And The Grenadines',
      region: 'Northeast Central Asia',
      winner: 'People\'s Government of Hoboksar Mongol Autonomous County and Shitoluogai TownPeople\'s Government of Hoboksar Mongol Autonomous County and Shitoluogai Town',
      table: {
        origin: {
          date: '30 June 2023',
          loan: 'ABD Loan No.3631-PHI improving Growth Corridors in Mindanao Road Sector Project(IGCMRSP)',
          contract:
            'ABD Loan No.3631-PHI improving Growth Corridors in Mindanao Road Sector Project(IGCMRSP)',
          deadline: '16 August 2023 at 10:00am (philippine time)',
        },
        zh: {
          date: '2023年6月30日',
          loan: 'ABD贷款第3631-PHI号 改善棉老公路部内增长走廊项目',
          contract: 'ABD贷款第3631-PHI号 改善棉老公路部内增长走廊项目',
          deadline: '2023年8月16日上午10点（菲律宾时间）',
        },
        en: {
          date: '30 June 2023',
          loan: 'ABD Loan No.3631-PHI improving Growth Corridors in Mindanao Road Sector Project(IGCMRSP)',
          contract:
            'ABD Loan No.3631-PHI improving Growth Corridors in Mindanao Road Sector Project(IGCMRSP)',
          deadline: '16 August 2023 at 10:00am (philippine time)',
        },
      },

      detail: {
        origin: `1. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

      2. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

      3. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
      One-Envelope bidding procedure.

      4. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:
      5. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

      6. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

      7. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
      One-Envelope bidding procedure.

      8. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:`,

        zh: `1. 菲律宾共和国已经从亚洲开发银行（ADB）获得资金，用于改善棉兰老岛道路部门增长走廊项目（IGCMRSP）的成本。该资金的一部分将用于上述合同的支付。投标对来自ADB符合资格来源国家的投标人开放。

    2. 公共工程与公路部（"雇主"）邀请符合资格的投标人提交密封投标，供应、交付、安装、配置、实施和支持人力资源信息系统（"设施"）。

    3. 将按照单阶段：一信封投标程序进行国际竞争性招标（ICB）。

    4. 只有具备招标文件中定义的以下关键资格的符合资格投标人才能参与此次招标。

      5. 菲律宾共和国已经从亚洲开发银行（ADB）获得资金，用于改善棉兰老岛道路部门增长走廊项目（IGCMRSP）的成本。该资金的一部分将用于上述合同的支付。投标对来自ADB符合资格来源国家的投标人开放。

      6. 公共工程与公路部（"雇主"）邀请符合资格的投标人提交密封投标，供应、交付、安装、配置、实施和支持人力资源信息系统（"设施"）。

      7. 将按照单阶段：一信封投标程序进行国际竞争性招标（ICB）。

      8. 只有具备招标文件中定义的以下关键资格的符合资格投标人才能参与此次招标。`,

        en: `1. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

      2. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

      3. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
      One-Envelope bidding procedure.

      4. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:
      5. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

      6. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

      7. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
      One-Envelope bidding procedure.

      8. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:`
      },

      docs: [
        {
          id: 0,
          type: 'docx',
          title: 'The goods required are for making up of patient\'s clothing for public hospitalsfor ublic hospitalsfor ublicabcwsdass hospitalsaafor...docx',
          size: '12.1MB',
          date: 'Jul 22, 2023',
        },
        {
          id: 1,
          type: 'docx',
          title: 'Tender Invitation for Construction Services_Project Specifications and Requirements Document.docx',
          size: '4.1MB',
          date: 'Jul 22, 2023',
        },
        {
          id: 2,
          type: 'pdf',
          title: 'The goods required are for making up of patient\'s clothing for public hospitalsfor.pdf',
          size: '831.5KB',
          date: 'Jul 22, 2023',
        },
        {
          id: 3,
          type: 'xlsx',
          title: 'The goods required are for making up of patient\'s clothing for public hospitalsfor.xlsx',
          size: '12.1MB',
          date: 'Jul 22, 2023',
        },
      ]
    },
    {
      id: 2,
      type: 1, // 0 => Award notice; 1 => Call for projects; 2 => Ongoing tenders; 3 => Abandoned tenders
      hadCollected: true,
      title: 'The goods required are for making up of patients <span class="highlight">clothing</span> for public hospitals patients',
      // detail: 'The goods required are for making up of patients <span class="highlight">clothing</span> for public hospitals,The goods required ',
      countryISO: 'ai',
      otherOrgISO: ['un',],
      release: '04 MAY 2024',
      deadline: '14 MAY 2024',
      cpv: 'CPV: 53 Construction structures and materials; auxiliary products to construction (except electric apparatus)',
      country: 'Saint Vincent And The Grenadines',
      region: 'Northeast Central Asia',
      winner: 'People\'s Government of Hoboksar Mongol Autonomous County and Shitoluogai TownPeople\'s Government of Hoboksar Mongol Autonomous County and Shitoluogai Town',

    table: {
      origin: {
        date: '30 June 2023',
        loan: 'ABD Loan No.3631-PHI improving Growth Corridors in Mindanao Road Sector Project(IGCMRSP)',
        contract:
          'ABD Loan No.3631-PHI improving Growth Corridors in Mindanao Road Sector Project(IGCMRSP)',
        deadline: '16 August 2023 at 10:00am (philippine time)',
      },
      zh: {
        date: '2023年6月30日',
        loan: 'ABD贷款第3631-PHI号 改善棉老公路部内增长走廊项目',
        contract: 'ABD贷款第3631-PHI号 改善棉老公路部内增长走廊项目',
        deadline: '2023年8月16日上午10点（菲律宾时间）',
      },
      en: {
        date: '30 June 2023',
        loan: 'ABD Loan No.3631-PHI improving Growth Corridors in Mindanao Road Sector Project(IGCMRSP)',
        contract:
          'ABD Loan No.3631-PHI improving Growth Corridors in Mindanao Road Sector Project(IGCMRSP)',
        deadline: '16 August 2023 at 10:00am (philippine time)',
      },
    },

    detail: {
      origin: `1. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    2. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    3. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    4. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:
    5. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    6. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    7. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    8. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:`,

      zh: `1. 菲律宾共和国已经从亚洲开发银行（ADB）获得资金，用于改善棉兰老岛道路部门增长走廊项目（IGCMRSP）的成本。该资金的一部分将用于上述合同的支付。投标对来自ADB符合资格来源国家的投标人开放。

  2. 公共工程与公路部（"雇主"）邀请符合资格的投标人提交密封投标，供应、交付、安装、配置、实施和支持人力资源信息系统（"设施"）。

  3. 将按照单阶段：一信封投标程序进行国际竞争性招标（ICB）。

  4. 只有具备招标文件中定义的以下关键资格的符合资格投标人才能参与此次招标。

    5. 菲律宾共和国已经从亚洲开发银行（ADB）获得资金，用于改善棉兰老岛道路部门增长走廊项目（IGCMRSP）的成本。该资金的一部分将用于上述合同的支付。投标对来自ADB符合资格来源国家的投标人开放。

    6. 公共工程与公路部（"雇主"）邀请符合资格的投标人提交密封投标，供应、交付、安装、配置、实施和支持人力资源信息系统（"设施"）。

    7. 将按照单阶段：一信封投标程序进行国际竞争性招标（ICB）。

    8. 只有具备招标文件中定义的以下关键资格的符合资格投标人才能参与此次招标。`,

      en: `1. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    2. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    3. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    4. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:
    5. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    6. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    7. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    8. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:`
    },

    docs: [
      {
        id: 0,
        type: 'docx',
        title: 'The goods required are for making up of patient\'s clothing for public hospitalsfor ublic hospitalsfor ublicabcwsdass hospitalsaafor...docx',
        size: '12.1MB',
        date: 'Jul 22, 2023',
        detail: {
          origin: `1. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    2. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    3. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    4. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:
    5. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    6. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    7. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    8. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:`,

          zh: `1. 菲律宾共和国已经从亚洲开发银行（ADB）获得资金，用于改善棉兰老岛道路部门增长走廊项目（IGCMRSP）的成本。该资金的一部分将用于上述合同的支付。投标对来自ADB符合资格来源国家的投标人开放。

  2. 公共工程与公路部（"雇主"）邀请符合资格的投标人提交密封投标，供应、交付、安装、配置、实施和支持人力资源信息系统（"设施"）。

  3. 将按照单阶段：一信封投标程序进行国际竞争性招标（ICB）。

  4. 只有具备招标文件中定义的以下关键资格的符合资格投标人才能参与此次招标。

    5. 菲律宾共和国已经从亚洲开发银行（ADB）获得资金，用于改善棉兰老岛道路部门增长走廊项目（IGCMRSP）的成本。该资金的一部分将用于上述合同的支付。投标对来自ADB符合资格来源国家的投标人开放。

    6. 公共工程与公路部（"雇主"）邀请符合资格的投标人提交密封投标，供应、交付、安装、配置、实施和支持人力资源信息系统（"设施"）。

    7. 将按照单阶段：一信封投标程序进行国际竞争性招标（ICB）。

    8. 只有具备招标文件中定义的以下关键资格的符合资格投标人才能参与此次招标。`,

          en: `1. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    2. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    3. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    4. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:
    5. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    6. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    7. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    8. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:`
        },
      },
      {
        id: 1,
        type: 'docx',
        title: 'Tender Invitation for Construction Services_Project Specifications and Requirements Document.docx',
        size: '4.1MB',
        date: 'Jul 22, 2023',
        detail: {
          origin: `1. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    2. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    3. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    4. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:
    5. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    6. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    7. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    8. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:`,

          zh: `1. 菲律宾共和国已经从亚洲开发银行（ADB）获得资金，用于改善棉兰老岛道路部门增长走廊项目（IGCMRSP）的成本。该资金的一部分将用于上述合同的支付。投标对来自ADB符合资格来源国家的投标人开放。

  2. 公共工程与公路部（"雇主"）邀请符合资格的投标人提交密封投标，供应、交付、安装、配置、实施和支持人力资源信息系统（"设施"）。

  3. 将按照单阶段：一信封投标程序进行国际竞争性招标（ICB）。

  4. 只有具备招标文件中定义的以下关键资格的符合资格投标人才能参与此次招标。

    5. 菲律宾共和国已经从亚洲开发银行（ADB）获得资金，用于改善棉兰老岛道路部门增长走廊项目（IGCMRSP）的成本。该资金的一部分将用于上述合同的支付。投标对来自ADB符合资格来源国家的投标人开放。

    6. 公共工程与公路部（"雇主"）邀请符合资格的投标人提交密封投标，供应、交付、安装、配置、实施和支持人力资源信息系统（"设施"）。

    7. 将按照单阶段：一信封投标程序进行国际竞争性招标（ICB）。

    8. 只有具备招标文件中定义的以下关键资格的符合资格投标人才能参与此次招标。`,

          en: `1. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    2. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    3. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    4. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:
    5. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    6. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    7. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    8. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:`
        },
      },
      {
        id: 2,
        type: 'pdf',
        title: 'The goods required are for making up of patient\'s clothing for public hospitalsfor.pdf',
        size: '831.5KB',
        date: 'Jul 22, 2023',
        detail: {
          origin: `1. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    2. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    3. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    4. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:
    5. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    6. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    7. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    8. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:`,

          zh: `1. 菲律宾共和国已经从亚洲开发银行（ADB）获得资金，用于改善棉兰老岛道路部门增长走廊项目（IGCMRSP）的成本。该资金的一部分将用于上述合同的支付。投标对来自ADB符合资格来源国家的投标人开放。

  2. 公共工程与公路部（"雇主"）邀请符合资格的投标人提交密封投标，供应、交付、安装、配置、实施和支持人力资源信息系统（"设施"）。

  3. 将按照单阶段：一信封投标程序进行国际竞争性招标（ICB）。

  4. 只有具备招标文件中定义的以下关键资格的符合资格投标人才能参与此次招标。

    5. 菲律宾共和国已经从亚洲开发银行（ADB）获得资金，用于改善棉兰老岛道路部门增长走廊项目（IGCMRSP）的成本。该资金的一部分将用于上述合同的支付。投标对来自ADB符合资格来源国家的投标人开放。

    6. 公共工程与公路部（"雇主"）邀请符合资格的投标人提交密封投标，供应、交付、安装、配置、实施和支持人力资源信息系统（"设施"）。

    7. 将按照单阶段：一信封投标程序进行国际竞争性招标（ICB）。

    8. 只有具备招标文件中定义的以下关键资格的符合资格投标人才能参与此次招标。`,

          en: `1. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    2. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    3. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    4. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:
    5. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    6. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    7. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    8. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:`
        },
      },
      {
        id: 3,
        type: 'xlsx',
        title: 'The goods required are for making up of patient\'s clothing for public hospitalsfor.xlsx',
        size: '12.1MB',
        date: 'Jul 22, 2023',
        detail: {
          origin: `1. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    2. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    3. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    4. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:
    5. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    6. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    7. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    8. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:`,

          zh: `1. 菲律宾共和国已经从亚洲开发银行（ADB）获得资金，用于改善棉兰老岛道路部门增长走廊项目（IGCMRSP）的成本。该资金的一部分将用于上述合同的支付。投标对来自ADB符合资格来源国家的投标人开放。

  2. 公共工程与公路部（"雇主"）邀请符合资格的投标人提交密封投标，供应、交付、安装、配置、实施和支持人力资源信息系统（"设施"）。

  3. 将按照单阶段：一信封投标程序进行国际竞争性招标（ICB）。

  4. 只有具备招标文件中定义的以下关键资格的符合资格投标人才能参与此次招标。

    5. 菲律宾共和国已经从亚洲开发银行（ADB）获得资金，用于改善棉兰老岛道路部门增长走廊项目（IGCMRSP）的成本。该资金的一部分将用于上述合同的支付。投标对来自ADB符合资格来源国家的投标人开放。

    6. 公共工程与公路部（"雇主"）邀请符合资格的投标人提交密封投标，供应、交付、安装、配置、实施和支持人力资源信息系统（"设施"）。

    7. 将按照单阶段：一信封投标程序进行国际竞争性招标（ICB）。

    8. 只有具备招标文件中定义的以下关键资格的符合资格投标人才能参与此次招标。`,

          en: `1. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    2. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    3. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    4. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:
    5. The Republic of the Philippines has received financing from the Asian Development Bank (ADB) towards the cost of Improving Growth Corridors in Mindanao Road Sector Project, IGCMRSP. Part of this financing will be used for payments under the Contract named above. Bidding is open to Bidders from eligible source countries of ADB.

    6. The Department of Public Works and Highways (“the Employer”) invites sealed bids from eligible Bidders for the supply, delivery, installation, configuration, implementation and support of Human Resource Information System (“the Facilities”).

    7. International Competitive Bidding (ICB) will be conducted in accordance withSingleStage:
    One-Envelope bidding procedure.

    8. Only eligible Bidders with the following key qualifications defined in the Bidding Document may participate in this bidding:`
        },
      },
    ]
  },
]

// 内存中存储任务进度的对象
const taskProgress = {
    // '00en' : 50,
    // '02zh' : 25,
    // '02ko': 10
};
// 非会员解锁池
const userUnlockedPool = {
  '1': [1, 3],
  '2': []
}
// 每次访问时增加进度的增量
const progressIncrement = 20;


// 翻译请求
app.post('/translate', (req, res) => {
    console.log(req.body);
    const { tenderId, docId, lang } = req.body;
    // 给对应用户的tenderDocs添加语言类型
    // 返回一个翻译任务id
    res.send({ taskId: '' + tenderId + docId + lang });
});
app.get('/getTenderById', (req, res) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization;
  }
  console.log(token)
  const { tenderId } = req.query;
  let tender = tenderList.find(item => item.id === Number(tenderId));
    if (token === '0') {
      console.log('会员')
      // 会员
    }else if(token === '1' || token === '2') {
      // token === 1(非会员)
      console.log('非会员')
      // 这里要仔细操作，查找当前tenderId是否包含在该会员解锁池内
      if (!userUnlockedPool[token].includes(Number(tenderId))){
        tender = { ...tender, table: '', detail: '', winner: '' };
      }
    }
    else {
      // token === null（未登录）
      console.log('未登录')
      tender = { ...tender, table: '', detail: '', winner: '' };
    }
  console.log(tender)
    // 返回tender
    res.json({ tender });
});
app.get('/confirmMemberById/:userId', (req, res) => {
  const id = Number(req.params.userId);
  let confirmResult;
  if (id === 0){
  //   是会员
    confirmResult = true
  }else if (id === 1) {
    confirmResult = false
  }
  // 返回tender
  res.json({ confirmResult });
});
// 查询翻译进度
app.get('/translate/status/:taskId', (req, res) => {
    const taskId = req.params.taskId;

    // 如果任务不存在，初始化进度为0
    if (!taskProgress[taskId]) {
        taskProgress[taskId] = 0;
    }

    // 增加任务进度
    taskProgress[taskId] += progressIncrement;

    // 确保进度不超过100
    if (taskProgress[taskId] > 100) {
        taskProgress[taskId] = 100;
    }

    // 返回当前进度
    res.json({ progress: taskProgress[taskId] });
});

// 校验token
function verifyToken(token) {
  return true
}
app.get('/api/check-token', (req, res) => {
  const token = req.headers.authorization;

  // 假设你有一个函数 verifyToken 用于验证 token
  if (verifyToken(token)) {
    res.status(200).json({ valid: true });
  } else {
    res.status(401).json({ valid: false });
  }
});
// 查找用户的解锁次数记录
app.get('/getUnlockTimes', (req, res) => {
//   验证token,根据token信息查找对应数据
  res.status(200).json(
    {
      times: {
        unlockTimes: 1,
        shareTimes: 0,
        taskTimes: 1,
      }
    }
  )
})
// 修改对应用户的解锁次数 返回解锁的tender
app.put('/updateUserUnlockTimes', (req, res) => {
//   验证token,根据token信息查找对应数据
// 根据token 和 type修改对应用户的解锁次数
  const token = req.headers.authorization;
  const { tenderId, type } = req.body
  userUnlockedPool[token].push(Number(tenderId))
  console.log(tenderId, type)
  const tender = tenderList.find(item => item.id === Number(tenderId));
  res.status(200).json({tender})
})


// 错误处理
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
