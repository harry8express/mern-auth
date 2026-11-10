import express from 'express'
import {authUser,registerUser,logoutUser,getUserProfile,updateUserProfile,deleteUserProfile,couponUser,searchData,updateCheckBox}  from '../controllers/userController.js';
const router=express.Router();
router.post('/',registerUser);
router.get('/auth/:id',authUser);
router.post('/logout',logoutUser);
router.route('/profile/').get(getUserProfile).put(updateUserProfile)
router.route('/searchdata').get(searchData)
router.route('/profile/:id').delete(deleteUserProfile).put(updateCheckBox)
router.get('/coupon',couponUser);
export default router ;