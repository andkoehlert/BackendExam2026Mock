import express, { Router, Request, Response } from 'express';
import { verifyTokenMiddleware } from './middlewares/auth';

import {
getAllAarligeSaldo,
  createAarligeSaldo,
  getAarligeSaldoByUser,
  updateAarligeSaldoByUser,
  deleteAarligeSaldoByUser
} from "./controller/aarligeSaldo";


import {
  createLargestPeriodOverview,
  getLargestPeriodOverview,
  updateLargestPeriodOverviewById,
  deleteLargestPeriodOverviewById
} from "./controller/largestPeriodOverview";


import {
  createSegmentOverview,
  getSegmentOverviewByUser,
  getAllSegmentOverview,
  updateSegmentOverviewByUser,
  deleteSegmentOverviewByUser
} from './controller/segmentData';

import {
  createSummaryData,
  getAllSummaryData,
  getSummaryDataByYear,
  updateSummaryDataByYear,
  deleteSummaryDataByYear
} from "./controller/summaryData";


import {
  createDailyData,
  getAllDailyData,
  getDailyDataByYear,
  updateDailyDataByYear,
  deleteDailyDataByYear
} from './controller/dailyData';


import {
  createQuarterlyData,
  getAllQuarterlyData,
  getQuarterlyDataByUser,
  updateQuarterlyDataByUser,
  deleteQuarterlyDataByUser
} from './controller/queaterlyData';


import {
  createMonthlyData,
  getMonthlyDataByUser,
  getAllMonthlyData,
  updateMonthlyDataByUser,
  deleteMonthlyDataByUser
} from './controller/monthlyData';

    import { 
  createRevenueData, 
  getAllRevenueData, 
  getRevenueDataByYear,
  updateRevenueDataByYear,
  deleteRevenueDataByYear 
} from './controller/revenueData';


import {uploadImage} from './controller/uploadImage'
import {upload} from './middlewares/multer'
import { loginUser, registerUser, verifyToken } from './controller/authController';

const router: Router = Router();


// Årlige Saldo Routes

/**
 * @swagger
 * /aarlige-saldo:
 *   post:
 *     tags:
 *       - Årlige Saldo
 *     summary: Create yearly saldo data for authenticated user
 *     description: Create yearly saldo overview data for the logged-in user
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - year
 *               - saldo
 *             properties:
 *               year:
 *                 type: number
 *                 example: 2024
 *               saldo:
 *                 type: number
 *                 example: 325000
 *           example:
 *             year: 2024
 *             saldo: 325000
 *     responses:
 *       201:
 *         description: Yearly saldo data created successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error creating yearly saldo data
 */
router.post('/aarlige-saldo', verifyTokenMiddleware, createAarligeSaldo);

/**
 * @swagger
 * /aarlige-saldo/me:
 *   get:
 *     tags:
 *       - Årlige Saldo
 *     summary: Get yearly saldo data for authenticated user
 *     description: Retrieve yearly saldo overview data belonging to the logged-in user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Yearly saldo data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 year:
 *                   type: number
 *                 saldo:
 *                   type: number
 *       404:
 *         description: No yearly saldo data found for this user
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error fetching yearly saldo data
 */
router.get('/aarlige-saldo/me', verifyTokenMiddleware, getAarligeSaldoByUser);

/**
 * @swagger
 * /aarlige-saldo:
 *   get:
 *     tags:
 *       - Årlige Saldo
 *     summary: Get all yearly saldo data (admin only)
 *     description: Retrieve all yearly saldo entries
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all yearly saldo data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Error fetching yearly saldo data
 */
router.get('/aarlige-saldo', verifyTokenMiddleware, getAllAarligeSaldo);

/**
 * @swagger
 * /aarlige-saldo/me:
 *   put:
 *     tags:
 *       - Årlige Saldo
 *     summary: Update yearly saldo data for authenticated user
 *     description: Update or create (upsert) yearly saldo data for the logged-in user
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               year:
 *                 type: number
 *                 example: 2024
 *               saldo:
 *                 type: number
 *                 example: 410000
 *     responses:
 *       200:
 *         description: Yearly saldo data updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error updating yearly saldo data
 */
router.put('/aarlige-saldo/me', verifyTokenMiddleware, updateAarligeSaldoByUser);

/**
 * @swagger
 * /aarlige-saldo/me:
 *   delete:
 *     tags:
 *       - Årlige Saldo
 *     summary: Delete yearly saldo data for authenticated user
 *     description: Delete yearly saldo overview data belonging to the logged-in user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Yearly saldo data deleted successfully
 *       404:
 *         description: No yearly saldo data found to delete
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error deleting yearly saldo data
 */
router.delete('/aarlige-saldo/me', verifyTokenMiddleware, deleteAarligeSaldoByUser);

/**
 * @swagger
 * /stoerste-perioder:
 *   post:
 *     tags:
 *       - Largest Period Overview
 *     summary: Create largest period overview data
 *     description: Create a new overview containing the largest month, quarter, and year per year
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Largest period overview data created successfully
 *       500:
 *         description: Error creating largest period overview data
 */
router.post('/stoerste-perioder', createLargestPeriodOverview);

/**
 * @swagger
 * /stoerste-perioder:
 *   get:
 *     tags:
 *       - Largest Period Overview
 *     summary: Get largest period overview data
 *     description: Retrieve the largest month, quarter, and year overview
 *     responses:
 *       200:
 *         description: Successfully retrieved largest period overview data
 *       404:
 *         description: No largest period overview data found
 *       500:
 *         description: Error fetching largest period overview data
 */
router.get('/stoerste-perioder', getLargestPeriodOverview);

/**
 * @swagger
 * /stoerste-perioder/{id}:
 *   put:
 *     tags:
 *       - Largest Period Overview
 *     summary: Update largest period overview data by ID
 *     description: Update existing largest period overview document
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The document ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Largest period overview data updated successfully
 *       404:
 *         description: Cannot update - largest period overview data not found
 *       500:
 *         description: Error updating largest period overview data
 */
router.put('/stoerste-perioder/:id', updateLargestPeriodOverviewById);

/**
 * @swagger
 * /stoerste-perioder/{id}:
 *   delete:
 *     tags:
 *       - Largest Period Overview
 *     summary: Delete largest period overview data by ID
 *     description: Delete largest period overview document
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The document ID
 *     responses:
 *       200:
 *         description: Largest period overview data deleted successfully
 *       404:
 *         description: Cannot delete - largest period overview data not found
 *       500:
 *         description: Error deleting largest period overview data
 */
router.delete('/stoerste-perioder/:id', deleteLargestPeriodOverviewById);


// Segment Overview Routes
/**
 * @swagger
 * /segment-overblik:
 *   post:
 *     tags:
 *       - Segment Overview
 *     summary: Create new segment overview data
 *     description: Create a new segment overview entry containing all years and segments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Segment overview data created successfully
 *       500:
 *         description: Error creating segment overview data
 */
/**
 * @swagger
 * /segment-overblik:
 *   post:
 *     tags:
 *       - Segment Overview
 *     summary: Create segment overview data for authenticated user
 *     description: Create segment overview data for the logged-in user
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - year
 *                     - segments
 *                   properties:
 *                     year:
 *                       type: number
 *                       example: 2024
 *                     segments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         required:
 *                           - name
 *                           - percentage
 *                           - amount
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Erhverv"
 *                           percentage:
 *                             type: number
 *                             example: 45.5
 *                           amount:
 *                             type: number
 *                             example: 1250000
 *           example:
 *             data:
 *               - year: 2024
 *                 segments:
 *                   - name: "Erhverv"
 *                     percentage: 45.5
 *                     amount: 1250000
 *                   - name: "Private"
 *                     percentage: 32.3
 *                     amount: 890000
 *                   - name: "Offentlig"
 *                     percentage: 22.2
 *                     amount: 610000
 *               - year: 2023
 *                 segments:
 *                   - name: "Erhverv"
 *                     percentage: 42.1
 *                     amount: 1100000
 *                   - name: "Private"
 *                     percentage: 35.8
 *                     amount: 950000
 *                   - name: "Offentlig"
 *                     percentage: 22.1
 *                     amount: 580000
 *     responses:
 *       201:
 *         description: Segment overview data created successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error creating segment overview data
 */
router.post('/segment-overblik', verifyTokenMiddleware, createSegmentOverview);

/**
 * @swagger
 * /segment-overblik/me:
 *   get:
 *     tags:
 *       - Segment Overview
 *     summary: Get segment overview data for authenticated user
 *     description: Retrieve segment overview data belonging to the logged-in user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Segment overview data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: No segment overview data found for this user
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error fetching segment overview data
 */
router.get('/segment-overblik/me', verifyTokenMiddleware, getSegmentOverviewByUser);

/**
 * @swagger
 * /segment-overblik:
 *   get:
 *     tags:
 *       - Segment Overview
 *     summary: Get all segment overview data (admin only)
 *     description: Retrieve all segment overview entries
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all segment overview data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Error fetching segment overview data
 */
router.get('/segment-overblik', verifyTokenMiddleware, getAllSegmentOverview);

/**
 * @swagger
 * /segment-overblik/me:
 *   put:
 *     tags:
 *       - Segment Overview
 *     summary: Update segment overview data for authenticated user
 *     description: Update or create (upsert) segment overview data for the logged-in user
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     year:
 *                       type: number
 *                     segments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           percentage:
 *                             type: number
 *                           amount:
 *                             type: number
 *     responses:
 *       200:
 *         description: Segment overview data updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error updating segment overview data
 */
router.put('/segment-overblik/me', verifyTokenMiddleware, updateSegmentOverviewByUser);

/**
 * @swagger
 * /segment-overblik/me:
 *   delete:
 *     tags:
 *       - Segment Overview
 *     summary: Delete segment overview data for authenticated user
 *     description: Delete all segment overview data belonging to the logged-in user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Segment overview data deleted successfully
 *       404:
 *         description: No segment overview data found to delete
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error deleting segment overview data
 */
router.delete('/segment-overblik/me', verifyTokenMiddleware, deleteSegmentOverviewByUser);
/**
 * @swagger
 * /summary-data:
 *   post:
 *     summary: Create a new summary data entry
 *     tags: [SummaryData]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SummaryData'
 *     responses:
 *       201:
 *         description: Summary data created successfully
 *       500:
 *         description: Server error
 * 
 *   get:
 *     summary: Get all summary data
 *     tags: [SummaryData]
 *     responses:
 *       200:
 *         description: List of summary data
 *       500:
 *         description: Server error
 * 
 * /summary-data/{year}:
 *   get:
 *     summary: Get summary data by year
 *     tags: [SummaryData]
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Summary data for the year
 *       404:
 *         description: Not found
 * 
 *   put:
 *     summary: Update summary data by year
 *     tags: [SummaryData]
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SummaryData'
 *     responses:
 *       200:
 *         description: Summary data updated
 *       404:
 *         description: Not found
 * 
 *   delete:
 *     summary: Delete summary data by year
 *     tags: [SummaryData]
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Summary data deleted
 *       404:
 *         description: Not found
 */

router.post("/summary-data", createSummaryData);
router.get("/summary-data", getAllSummaryData);
router.get("/summary-data/:year", getSummaryDataByYear);
router.put("/summary-data/:year", updateSummaryDataByYear);
router.delete("/summary-data/:year", deleteSummaryDataByYear);

/**
 * @swagger
 * /daily-data:
 *   post:
 *     summary: Create daily data (bulk)
 *     tags: [DailyData]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DailyDataCollection'
 *     responses:
 *       201:
 *         description: Daily data created
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get all daily data
 *     tags: [DailyData]
 *     responses:
 *       200:
 *         description: List of daily data
 *       500:
 *         description: Server error
 *
 * /daily-data/{year}:
 *   get:
 *     summary: Get daily data by year
 *     tags: [DailyData]
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Daily data for the year
 *       404:
 *         description: Not found
 *
 *   put:
 *     summary: Update daily data by year
 *     tags: [DailyData]
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/YearlyDailyData'
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 *
 *   delete:
 *     summary: Delete daily data by year
 *     tags: [DailyData]
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 */

router.post('/daily-data', createDailyData);
router.get('/daily-data', getAllDailyData);
router.get('/daily-data/:year', getDailyDataByYear);
router.put('/daily-data/:year', updateDailyDataByYear);
router.delete('/daily-data/:year', deleteDailyDataByYear);
// Quarterly Data Routes

/**
 * @swagger
 * /quarterly:
 *   post:
 *     tags:
 *       - Quarterly Data
 *     summary: Create quarterly data for authenticated user
 *     description: Create quarterly overview data for the logged-in user
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - year
 *                     - quarters
 *                   properties:
 *                     year:
 *                       type: number
 *                       example: 2024
 *                     quarters:
 *                       type: array
 *                       items:
 *                         type: object
 *                         required:
 *                           - quarter
 *                           - amount
 *                         properties:
 *                           quarter:
 *                             type: string
 *                             example: "Q1"
 *                           amount:
 *                             type: number
 *                             example: 250000
 *     responses:
 *       201:
 *         description: Quarterly data created successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error creating quarterly data
 */
router.post('/quarterly', verifyTokenMiddleware, createQuarterlyData);

/**
 * @swagger
 * /quarterly/me:
 *   get:
 *     tags:
 *       - Quarterly Data
 *     summary: Get quarterly data for authenticated user
 *     description: Retrieve quarterly data belonging to the logged-in user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Quarterly data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 data:
 *                   type: array
 *       404:
 *         description: No quarterly data found for this user
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error fetching quarterly data
 */
router.get('/quarterly/me', verifyTokenMiddleware, getQuarterlyDataByUser);

/**
 * @swagger
 * /quarterly:
 *   get:
 *     tags:
 *       - Quarterly Data
 *     summary: Get all quarterly data (admin only)
 *     description: Retrieve all quarterly data entries
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all quarterly data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Error fetching quarterly data
 */
router.get('/quarterly', verifyTokenMiddleware, getAllQuarterlyData);

/**
 * @swagger
 * /quarterly/me:
 *   put:
 *     tags:
 *       - Quarterly Data
 *     summary: Update quarterly data for authenticated user
 *     description: Update or create (upsert) quarterly data for the logged-in user
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: array
 *     responses:
 *       200:
 *         description: Quarterly data updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error updating quarterly data
 */
router.put('/quarterly/me', verifyTokenMiddleware, updateQuarterlyDataByUser);

/**
 * @swagger
 * /quarterly/me:
 *   delete:
 *     tags:
 *       - Quarterly Data
 *     summary: Delete quarterly data for authenticated user
 *     description: Delete quarterly data belonging to the logged-in user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Quarterly data deleted successfully
 *       404:
 *         description: No quarterly data found to delete
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error deleting quarterly data
 */
router.delete('/quarterly/me', verifyTokenMiddleware, deleteQuarterlyDataByUser);



/**
 * @swagger
 * /monthly-data:
 *   post:
 *     tags:
 *       - Monthly Data
 *     summary: Create monthly data for authenticated user
 *     description: Create monthly data for the logged-in user. The userId is derived from the JWT token.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - year
 *                     - months
 *                   properties:
 *                     year:
 *                       type: number
 *                       example: 2024
 *                     months:
 *                       type: array
 *                       items:
 *                         type: object
 *                         required:
 *                           - month
 *                           - monthNumber
 *                           - afregnet
 *                           - ditMaal
 *                         properties:
 *                           month:
 *                             type: string
 *                             example: January
 *                           monthNumber:
 *                             type: number
 *                             example: 1
 *                           afregnet:
 *                             type: number
 *                             example: 1200
 *                           ditMaal:
 *                             type: number
 *                             example: 1500
 *     responses:
 *       201:
 *         description: Monthly data created successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error creating monthly data
 */
router.post('/monthly-data', verifyTokenMiddleware, createMonthlyData);

/**
 * @swagger
 * /monthly-data/me:
 *   get:
 *     tags:
 *       - Monthly Data
 *     summary: Get monthly data for authenticated user
 *     description: Retrieve monthly data belonging to the logged-in user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: 64f1c8b1e3a9f4c123456789
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       year:
 *                         type: number
 *                       months:
 *                         type: array
 *                         items:
 *                           type: object
 *       404:
 *         description: No monthly data found for this user
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error fetching monthly data
 */
router.get('/monthly-data/me', verifyTokenMiddleware, getMonthlyDataByUser);

/**
 * @swagger
 * /monthly-data:
 *   get:
 *     tags:
 *       - Monthly Data
 *     summary: Get all monthly data (admin only)
 *     description: Retrieve all monthly data entries. Intended for admin users only.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: All monthly data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Error fetching monthly data
 */
router.get('/monthly-data', verifyTokenMiddleware, getAllMonthlyData);

/**
 * @swagger
 * /monthly-data/me:
 *   put:
 *     tags:
 *       - Monthly Data
 *     summary: Update monthly data for authenticated user
 *     description: Update or create (upsert) monthly data for the logged-in user.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     year:
 *                       type: number
 *                     months:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           month:
 *                             type: string
 *                           monthNumber:
 *                             type: number
 *                           afregnet:
 *                             type: number
 *                           ditMaal:
 *                             type: number
 *     responses:
 *       200:
 *         description: Monthly data updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error updating monthly data
 */
router.put('/monthly-data/me', verifyTokenMiddleware, updateMonthlyDataByUser);

/**
 * @swagger
 * /monthly-data/me:
 *   delete:
 *     tags:
 *       - Monthly Data
 *     summary: Delete monthly data for authenticated user
 *     description: Delete all monthly data belonging to the logged-in user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly data deleted successfully
 *       404:
 *         description: No monthly data found to delete
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error deleting monthly data
 */
router.delete('/monthly-data/me', verifyTokenMiddleware, deleteMonthlyDataByUser);
/**
 * @swagger
 * /revenue-data:
 *   post:
 *     tags:
 *       - Revenue Data
 *     summary: Create new revenue data
 *     description: Create a new revenue data entry for a specific year
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - year
 *               - categories
 *               - segments
 *               - totals
 *             properties:
 *               year:
 *                 type: number
 *                 example: 2024
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Transaktioner", "Indgåelse af entreprisekontrakter"]
 *               segments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     count:
 *                       type: number
 *                     data:
 *                       type: array
 *                       items:
 *                         type: number
 *                     total:
 *                       type: number
 *               totals:
 *                 type: object
 *                 properties:
 *                   count:
 *                     type: number
 *                   data:
 *                     type: array
 *                     items:
 *                       type: number
 *                   grandTotal:
 *                     type: number
 *     responses:
 *       201:
 *         description: Revenue data created successfully
 *       500:
 *         description: Error creating revenue data
 */
router.post('/revenue-data', createRevenueData);

/**
 * @swagger
 * /revenue-data:
 *   get:
 *     tags:
 *       - Revenue Data
 *     summary: Get all revenue data
 *     description: Retrieve all revenue data entries, sorted by year (descending)
 *     responses:
 *       200:
 *         description: Successfully retrieved all revenue data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error fetching revenue data
 */
router.get('/revenue-data', getAllRevenueData);

/**
 * @swagger
 * /revenue-data/{year}:
 *   get:
 *     tags:
 *       - Revenue Data
 *     summary: Get revenue data by year
 *     description: Retrieve revenue data for a specific year
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: The year to retrieve data for
 *         example: 2024
 *     responses:
 *       200:
 *         description: Successfully retrieved revenue data
 *       404:
 *         description: Revenue data not found for the specified year
 *       500:
 *         description: Error fetching revenue data
 */
router.get('/revenue-data/:year', getRevenueDataByYear);

/**
 * @swagger
 * /revenue-data/{year}:
 *   put:
 *     tags:
 *       - Revenue Data
 *     summary: Update revenue data by year
 *     description: Update existing revenue data for a specific year
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: The year to update data for
 *         example: 2024
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               year:
 *                 type: number
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *               segments:
 *                 type: array
 *                 items:
 *                   type: object
 *               totals:
 *                 type: object
 *     responses:
 *       200:
 *         description: Revenue data updated successfully
 *       404:
 *         description: Cannot update - revenue data not found
 *       500:
 *         description: Error updating revenue data
 */
router.put('/revenue-data/:year', updateRevenueDataByYear);

/**
 * @swagger
 * /revenue-data/{year}:
 *   delete:
 *     tags:
 *       - Revenue Data
 *     summary: Delete revenue data by year
 *     description: Delete revenue data for a specific year
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: The year to delete data for
 *         example: 2024
 *     responses:
 *       200:
 *         description: Revenue data deleted successfully
 *       404:
 *         description: Cannot delete - revenue data not found
 *       500:
 *         description: Error deleting revenue data
 */
router.delete('/revenue-data/:year', deleteRevenueDataByYear);

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - App Routes
 *     summary: Health check
 *     description: Basic route to check if the api is running
 *     responses:
 *       200:
 *         description: Server up and running.
 */

// get, post, put, delete

router.get('/', (req: Request, res: Response) => {
    res.status(200).send({message: 'Hello & welcome'});
});

router.post('/upload', upload.single('image'), uploadImage);



// auth
/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: Register a new user
 *     description: Takes a user in the body and tries to register it in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: User created succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 _id:
 *                   type: string
 */
// auth
router.post('/user/register', registerUser)
/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: Log in a user
 *     description: Authenticates a user and returns a JWT token if credentials are valid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourSecurePassword
 *     responses:
 *       200:
 *         description: Login successful
 *         headers:
 *           auth-token:
 *             schema:
 *               type: string
 *             description: JWT token for authenticated requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: null
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid credentials or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email or password is wrong"
 *       500:
 *         description: Server error
 */

router.post('/user/login', loginUser )

export default router