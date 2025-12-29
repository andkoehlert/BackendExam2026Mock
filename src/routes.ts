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
  getSegmentOverviewByYear,
  getSegmentComparison,
  getAllSegmentOverview,
  updateSegmentOverviewByYear,
  deleteSegmentOverviewByYear
} from './controller/segmentData';

import {
  createSummaryData,
  getSummaryDataByUser,
  getSummaryDataByYear,
  getAllSummaryData,
  updateSummaryDataByUser,
  updateSummaryDataByYear,
  deleteSummaryDataByUser,
  deleteSummaryDataByYear
} from './controller/summaryData';

import { 
  createDailyData, 
  getDailyDataByUser,
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
  getRevenueDataByUser,
  getRevenueDataByYear,
  getAllRevenueData,
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
 *       - Segment Overview (Actuals)
 *     summary: Create segment overview (actual) data for authenticated user
 *     description: Create actual performance data for segments for a specific year
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
 *                 example: ["Transaktioner", "Indgåelse af entreprisekontrakter", "Rådgivning", "Procesforing"]
 *               segments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - count
 *                     - data
 *                     - total
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
 *                 required:
 *                   - count
 *                   - data
 *                   - grandTotal
 *                 properties:
 *                   count:
 *                     type: number
 *                   data:
 *                     type: array
 *                     items:
 *                       type: number
 *                   grandTotal:
 *                     type: number
 *           example:
 *             year: 2024
 *             categories: ["Transaktioner", "Indgåelse af entreprisekontrakter", "Rådgivning", "Procesforing"]
 *             segments:
 *               - name: "Erhverv"
 *                 count: 42
 *                 data: [14, 9, 11, 8]
 *                 total: 42
 *               - name: "Private"
 *                 count: 33
 *                 data: [9, 8, 9, 7]
 *                 total: 33
 *               - name: "Offentlig"
 *                 count: 38
 *                 data: [9, 9, 10, 10]
 *                 total: 38
 *             totals:
 *               count: 113
 *               data: [32, 26, 30, 25]
 *               grandTotal: 113
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
 *       - Segment Overview (Actuals)
 *     summary: Get all segment overview data for authenticated user
 *     description: Retrieve all years of actual segment performance for the logged-in user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Segment overview data retrieved successfully
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
 * /segment-overblik/me/{year}:
 *   get:
 *     tags:
 *       - Segment Overview (Actuals)
 *     summary: Get segment overview by year for authenticated user
 *     description: Retrieve actual segment performance for a specific year
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *         example: 2024
 *     responses:
 *       200:
 *         description: Segment overview data retrieved successfully
 *       404:
 *         description: Segment overview data not found for this year
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error fetching segment overview data
 */
router.get('/segment-overblik/me/:year', verifyTokenMiddleware, getSegmentOverviewByYear);

/**
 * @swagger
 * /segment-overblik/comparison/{year}:
 *   get:
 *     tags:
 *       - Segment Overview (Actuals)
 *     summary: Get goals vs actuals comparison for a year
 *     description: Compare revenue goals with actual segment performance for a specific year
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *         example: 2024
 *     responses:
 *       200:
 *         description: Comparison data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 year:
 *                   type: number
 *                 goals:
 *                   type: object
 *                 actuals:
 *                   type: object
 *       404:
 *         description: No data found for this year
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error fetching comparison data
 */
router.get('/segment-overblik/comparison/:year', verifyTokenMiddleware, getSegmentComparison);

/**
 * @swagger
 * /segment-overblik:
 *   get:
 *     tags:
 *       - Segment Overview (Actuals)
 *     summary: Get all segment overview data (admin only)
 *     description: Retrieve all segment overview entries from all users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all segment overview data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error fetching segment overview data
 */
router.get('/segment-overblik', verifyTokenMiddleware, getAllSegmentOverview);

/**
 * @swagger
 * /segment-overblik/me/{year}:
 *   put:
 *     tags:
 *       - Segment Overview (Actuals)
 *     summary: Update segment overview by year
 *     description: Update or create actual segment performance for a specific year
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *         example: 2024
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Segment overview data updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error updating segment overview data
 */
router.put('/segment-overblik/me/:year', verifyTokenMiddleware, updateSegmentOverviewByYear);

/**
 * @swagger
 * /segment-overblik/me/{year}:
 *   delete:
 *     tags:
 *       - Segment Overview (Actuals)
 *     summary: Delete segment overview by year
 *     description: Delete actual segment performance for a specific year
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *         example: 2024
 *     responses:
 *       200:
 *         description: Segment overview data deleted successfully
 *       404:
 *         description: Cannot delete - data not found for this year
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error deleting segment overview data
 */
router.delete('/segment-overblik/me/:year', verifyTokenMiddleware, deleteSegmentOverviewByYear);

/**
 * @swagger
 * /summary-data:
 *   post:
 *     tags:
 *       - Summary Data
 *     summary: Create summary data for authenticated user
 *     description: Create summary data entries for multiple years for the logged-in user
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
 *                     - afregnetArbejde
 *                     - udstaendeTidsregistrering
 *                     - totalPotienale
 *                   properties:
 *                     year:
 *                       type: number
 *                       example: 2024
 *                     afregnetArbejde:
 *                       type: number
 *                       example: 2500000
 *                     udstaendeTidsregistrering:
 *                       type: number
 *                       example: 150000
 *                     totalPotienale:
 *                       type: number
 *                       example: 2650000
 *           example:
 *             data:
 *               - year: 2024
 *                 afregnetArbejde: 2500000
 *                 udstaendeTidsregistrering: 150000
 *                 totalPotienale: 2650000
 *               - year: 2023
 *                 afregnetArbejde: 2200000
 *                 udstaendeTidsregistrering: 120000
 *                 totalPotienale: 2320000
 *               - year: 2022
 *                 afregnetArbejde: 1950000
 *                 udstaendeTidsregistrering: 100000
 *                 totalPotienale: 2050000
 *     responses:
 *       201:
 *         description: Summary data created successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error creating summary data
 */
router.post('/summary-data', verifyTokenMiddleware, createSummaryData);

/**
 * @swagger
 * /summary-data/me:
 *   get:
 *     tags:
 *       - Summary Data
 *     summary: Get all summary data for authenticated user
 *     description: Retrieve all summary data entries belonging to the logged-in user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Summary data retrieved successfully
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
 *         description: No summary data found for this user
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error fetching summary data
 */
router.get('/summary-data/me', verifyTokenMiddleware, getSummaryDataByUser);

/**
 * @swagger
 * /summary-data/me/{year}:
 *   get:
 *     tags:
 *       - Summary Data
 *     summary: Get summary data by year for authenticated user
 *     description: Retrieve summary data for a specific year for the logged-in user
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *         description: The year to retrieve data for
 *         example: 2024
 *     responses:
 *       200:
 *         description: Summary data retrieved successfully
 *       404:
 *         description: Summary data not found for this year
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error fetching summary data
 */
router.get('/summary-data/me/:year', verifyTokenMiddleware, getSummaryDataByYear);

/**
 * @swagger
 * /summary-data:
 *   get:
 *     tags:
 *       - Summary Data
 *     summary: Get all summary data (admin only)
 *     description: Retrieve all summary data entries from all users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all summary data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Error fetching summary data
 */
router.get('/summary-data', verifyTokenMiddleware, getAllSummaryData);

/**
 * @swagger
 * /summary-data/me:
 *   put:
 *     tags:
 *       - Summary Data
 *     summary: Update all summary data for authenticated user
 *     description: Update or create (upsert) all summary data for the logged-in user
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
 *     responses:
 *       200:
 *         description: Summary data updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error updating summary data
 */
router.put('/summary-data/me', verifyTokenMiddleware, updateSummaryDataByUser);

/**
 * @swagger
 * /summary-data/me/{year}:
 *   put:
 *     tags:
 *       - Summary Data
 *     summary: Update summary data by year for authenticated user
 *     description: Update or create summary data for a specific year for the logged-in user
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *         description: The year to update
 *         example: 2024
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - afregnetArbejde
 *               - udstaendeTidsregistrering
 *               - totalPotienale
 *             properties:
 *               afregnetArbejde:
 *                 type: number
 *                 example: 2500000
 *               udstaendeTidsregistrering:
 *                 type: number
 *                 example: 150000
 *               totalPotienale:
 *                 type: number
 *                 example: 2650000
 *     responses:
 *       200:
 *         description: Summary data updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error updating summary data
 */
router.put('/summary-data/me/:year', verifyTokenMiddleware, updateSummaryDataByYear);

/**
 * @swagger
 * /summary-data/me:
 *   delete:
 *     tags:
 *       - Summary Data
 *     summary: Delete all summary data for authenticated user
 *     description: Delete all summary data belonging to the logged-in user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Summary data deleted successfully
 *       404:
 *         description: No summary data found to delete
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error deleting summary data
 */
router.delete('/summary-data/me', verifyTokenMiddleware, deleteSummaryDataByUser);
/**
 * @swagger
 * /daily-data:
 *   post:
 *     tags:
 *       - Daily Data
 *     summary: Create daily data for authenticated user
 *     description: Create daily data for the logged-in user. The userId is derived from the JWT token.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - years
 *             properties:
 *               years:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - year
 *                     - dailyData
 *                     - summary
 *                   properties:
 *                     year:
 *                       type: number
 *                       example: 2024
 *
 *                     dailyData:
 *                       type: array
 *                       items:
 *                         type: object
 *                         required:
 *                           - date
 *                         properties:
 *                           date:
 *                             type: string
 *                             format: date
 *                             example: "2024-01-08"
 *                           settledAmount:
 *                             type: number
 *                             example: 45000
 *                           caseValue:
 *                             type: number
 *                             example: 120000
 *                           casesSettled:
 *                             type: number
 *                             example: 2
 *                           status:
 *                             type: string
 *                             example: "aktiv"
 *                           workType:
 *                             type: string
 *                             example: "klientmøder"
 *                           industry:
 *                             type: string
 *                             example: "offentlige-myndigheder"
 *                           caseIds:
 *                             type: array
 *                             items:
 *                               type: string
 *                               example: "CASE-2024-001"
 *                           details:
 *                             type: object
 *                             properties:
 *                               meetings:
 *                                 type: number
 *                                 example: 2
 *                               hoursLogged:
 *                                 type: number
 *                                 example: 5.5
 *                               clientName:
 *                                 type: string
 *                                 example: "Kommune København"
 *
 *                     summary:
 *                       type: object
 *                       properties:
 *                         totalSettled:
 *                           type: number
 *                           example: 7825000
 *                         totalCaseValue:
 *                           type: number
 *                           example: 13565000
 *                         totalCases:
 *                           type: number
 *                           example: 65
 *                         averagePerDay:
 *                           type: number
 *                           example: 233582
 *                         activeByStatus:
 *                           type: object
 *                           additionalProperties:
 *                             type: number
 *                           example:
 *                             aktiv: 18
 *                             under-behandling: 15
 *                             venter-modpart: 8
 *                             venter-klient: 12
 *                             afsluttes-snart: 12
 *                         byWorkType:
 *                           type: object
 *                           additionalProperties:
 *                             type: number
 *                           example:
 *                             klientmøder: 420
 *                             retsmøder: 380
 *                             interne-møder: 180
 *                             forberedelsesmøder: 245
 *                         byIndustry:
 *                           type: object
 *                           additionalProperties:
 *                             type: number
 *                           example:
 *                             offentlige-myndigheder: 1450000
 *                             private-ejendomsudviklere: 2100000
 *                             almene-boligsaelskaber: 850000
 *                             pensionskasser: 1200000
 *                             private-ejendomsinvestorer: 1500000
 *                             kapital-fonde: 425000
 *                             asset-managers: 300000
 *
 *                     __v:
 *                       type: number
 *                       example: 0
 *
 *     responses:
 *       201:
 *         description: Daily data created successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error creating daily data
 */
router.post('/daily-data', verifyTokenMiddleware, createDailyData);

/**
 * @swagger
 * /daily-data/me:
 *   get:
 *     tags:
 *       - Daily Data
 *     summary: Get daily data for authenticated user
 *     description: Retrieve all daily data belonging to the logged-in user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Daily data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 years:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: No daily data found for this user
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error fetching daily data
 */
router.get('/daily-data/me', verifyTokenMiddleware, getDailyDataByUser);

/**
 * @swagger
 * /daily-data:
 *   get:
 *     tags:
 *       - Daily Data
 *     summary: Get all daily data (admin only)
 *     description: Retrieve all daily data entries. Intended for admin users only.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: All daily data retrieved successfully
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
 *         description: Error fetching daily data
 */
router.get('/daily-data', verifyTokenMiddleware, getAllDailyData);

/**
 * @swagger
 * /daily-data/{year}:
 *   get:
 *     tags:
 *       - Daily Data
 *     summary: Get daily data by year for authenticated user
 *     description: Retrieve daily data for a specific year belonging to the logged-in user.
 *     security:
 *       - BearerAuth: []
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
 *         description: Daily data for specified year retrieved successfully
 *       404:
 *         description: No daily data found for this year
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error fetching daily data
 */
router.get('/daily-data/:year', verifyTokenMiddleware, getDailyDataByYear);

/**
 * @swagger
 * /daily-data/{year}:
 *   put:
 *     tags:
 *       - Daily Data
 *     summary: Update daily data by year for authenticated user
 *     description: Update or create (upsert) daily data for a specific year for the logged-in user.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: The year to update
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
 *               months:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Daily data updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error updating daily data
 */
router.put('/daily-data/:year', verifyTokenMiddleware, updateDailyDataByYear);

/**
 * @swagger
 * /daily-data/{year}:
 *   delete:
 *     tags:
 *       - Daily Data
 *     summary: Delete daily data by year for authenticated user
 *     description: Delete daily data for a specific year belonging to the logged-in user.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: The year to delete
 *         example: 2024
 *     responses:
 *       200:
 *         description: Daily data deleted successfully
 *       404:
 *         description: No daily data found to delete
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error deleting daily data
 */
router.delete('/daily-data/:year', verifyTokenMiddleware, deleteDailyDataByYear);
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
 *       - Revenue Data (Goals)
 *     summary: Create revenue goals for authenticated user
 *     description: Create target revenue data for a specific year for the logged-in user
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
 *                 example: ["Transaktioner", "Indgåelse af entreprisekontrakter", "Rådgivning i forbindelse med planloven og anden regulering inkl. ekspropriation", "Mhjeret", "Erhvervsleje", "Rådgivning af off. Myndigheder i forbindelse med salg/byudvikling", "Rådgivning almene boliger", "Andet affært af KLA specialer (M&A, insolvens)", "Insolvensrådgivning"]
 *               segments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - name
 *                     - count
 *                     - data
 *                     - total
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Private ejendomsudviklere"
 *                     count:
 *                       type: number
 *                       description: Target number of cases/projects
 *                       example: 25
 *                     data:
 *                       type: array
 *                       items:
 *                         type: number
 *                       description: Target revenue per category in DKK
 *                       example: [600000, 150000, 50000, 75000, 0, 0, 0, 0, 0]
 *                     total:
 *                       type: number
 *                       description: Total target revenue for this segment in DKK
 *                       example: 875000
 *               totals:
 *                 type: object
 *                 required:
 *                   - count
 *                   - data
 *                   - grandTotal
 *                 properties:
 *                   count:
 *                     type: number
 *                     description: Total target number of cases
 *                     example: 73
 *                   data:
 *                     type: array
 *                     items:
 *                       type: number
 *                     description: Total target revenue per category in DKK
 *                     example: [1750000, 425000, 100000, 75000, 125000, 75000, 100000, 100000, 0]
 *                   grandTotal:
 *                     type: number
 *                     description: Total target revenue across all segments in DKK
 *                     example: 2750000
 *           example:
 *             year: 2024
 *             categories: ["Transaktioner", "Indgåelse af entreprisekontrakter", "Rådgivning i forbindelse med planloven og anden regulering inkl. ekspropriation", "Mhjeret", "Erhvervsleje", "Rådgivning af off. Myndigheder i forbindelse med salg/byudvikling", "Rådgivning almene boliger", "Andet affært af KLA specialer (M&A, insolvens)", "Insolvensrådgivning"]
 *             segments:
 *               - name: "Almene boligselskaber"
 *                 count: 5
 *                 data: [0, 0, 0, 0, 0, 0, 100000, 0, 0]
 *                 total: 100000
 *               - name: "Offentlige myndigheder"
 *                 count: 3
 *                 data: [0, 0, 0, 0, 0, 75000, 0, 0, 0]
 *                 total: 75000
 *               - name: "Private ejendomsudviklere"
 *                 count: 25
 *                 data: [600000, 150000, 50000, 75000, 0, 0, 0, 0, 0]
 *                 total: 875000
 *               - name: "Private ejendomsinvestorer"
 *                 count: 25
 *                 data: [600000, 150000, 50000, 0, 75000, 0, 0, 0, 0]
 *                 total: 875000
 *               - name: "Kapitalfonde"
 *                 count: 5
 *                 data: [200000, 50000, 0, 0, 0, 0, 0, 100000, 0]
 *                 total: 350000
 *               - name: "Pensionskasser"
 *                 count: 5
 *                 data: [200000, 50000, 0, 0, 25000, 0, 0, 0, 0]
 *                 total: 275000
 *               - name: "Asset managers"
 *                 count: 5
 *                 data: [150000, 25000, 0, 0, 25000, 0, 0, 0, 0]
 *                 total: 200000
 *             totals:
 *               count: 73
 *               data: [1750000, 425000, 100000, 75000, 125000, 75000, 100000, 100000, 0]
 *               grandTotal: 2750000
 *     responses:
 *       201:
 *         description: Revenue data created successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error creating revenue data
 */
router.post('/revenue-data', verifyTokenMiddleware, createRevenueData);

/**
 * @swagger
 * /revenue-data/me:
 *   get:
 *     tags:
 *       - Revenue Data (Goals)
 *     summary: Get all revenue goals for authenticated user
 *     description: Retrieve all revenue goal entries belonging to the logged-in user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Revenue data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No revenue data found for this user
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error fetching revenue data
 */
router.get('/revenue-data/me', verifyTokenMiddleware, getRevenueDataByUser);

/**
 * @swagger
 * /revenue-data/me/{year}:
 *   get:
 *     tags:
 *       - Revenue Data (Goals)
 *     summary: Get revenue goals by year for authenticated user
 *     description: Retrieve revenue goals for a specific year for the logged-in user
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *         description: The year to retrieve data for
 *         example: 2024
 *     responses:
 *       200:
 *         description: Revenue data retrieved successfully
 *       404:
 *         description: Revenue data not found for this year
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error fetching revenue data
 */
router.get('/revenue-data/me/:year', verifyTokenMiddleware, getRevenueDataByYear);

/**
 * @swagger
 * /revenue-data:
 *   get:
 *     tags:
 *       - Revenue Data (Goals)
 *     summary: Get all revenue data (admin only)
 *     description: Retrieve all revenue data entries from all users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all revenue data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Error fetching revenue data
 */
router.get('/revenue-data', verifyTokenMiddleware, getAllRevenueData);

/**
 * @swagger
 * /revenue-data/me/{year}:
 *   put:
 *     tags:
 *       - Revenue Data (Goals)
 *     summary: Update revenue goals by year for authenticated user
 *     description: Update or create (upsert) revenue goals for a specific year for the logged-in user
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *         description: The year to update
 *         example: 2024
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error updating revenue data
 */
router.put('/revenue-data/me/:year', verifyTokenMiddleware, updateRevenueDataByYear);

/**
 * @swagger
 * /revenue-data/me/{year}:
 *   delete:
 *     tags:
 *       - Revenue Data (Goals)
 *     summary: Delete revenue goals by year for authenticated user
 *     description: Delete revenue goals for a specific year for the logged-in user
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *         description: The year to delete
 *         example: 2024
 *     responses:
 *       200:
 *         description: Revenue data deleted successfully
 *       404:
 *         description: Cannot delete - revenue data not found for this year
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error deleting revenue data
 */
router.delete('/revenue-data/me/:year', verifyTokenMiddleware, deleteRevenueDataByYear);

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