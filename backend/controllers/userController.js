import asyncHandler from 'express-async-handler'
import UserModel from '../models/userModel.js'
import Information from '../models/information.js'
import moment from 'moment'
const authUser = asyncHandler(async (req, res) => {

      //res.status(200).json({message:'auth user'})
      const id = req.params.id;
      //const user = await UserModel.findById(id)
      //const information= await Information.find({姓名:user.name})
      /*const information = await Information.aggregate([{ $match: { 姓名: id } },
      {
            $lookup: {
                  from: 'usermodels',
                  localField: '姓名',
                  foreignField: 'name',
                  as: 'populatelist'
            }
      }, {
            $project: {
                  姓名: 1,
                  生日: 1,
                  住址: 1,
                  'populatelist.subject': 1,
                  'populatelist.date': 1,
            }
      }, {
            $sort: {
                  'populatelist.subject': 1
            }

      }
      ])*/
      const information = await Information.find({姓名:id})
      res.status(200).json(information)
      //console.log(JSON.stringify(information));

})

const registerUser = asyncHandler(async (req, res) => {
      const { date, name, time, subject } = req.body;
      const information = await Information.exists({ 姓名: name })

      if (information) {
            const userModel = await UserModel.create({
                  date,
                  name,
                  time,
                  subject
            });
            res.status(200).json(userModel)
      }

})

const logoutUser = asyncHandler(async (req, res) => {

      res.status(200).json({ message: 'Logout User' });
})

const getUserProfile = asyncHandler(async (req, res) => {

     
      //const userModel=await UserModel.aggregate([{$match:{date:{$gte:new Date(req.query.date),$lt:new Date(moment(req.query.date).add(1,'d'))},subject:{ $nin: ["欠123切券", "欠運途券", "欠魂魄券"] } }},{$lookup:{from:'information',localField:'name',foreignField:'姓名',as:'populatelist'}},
      //{$project:{date:1 ,name:1,time:1,subject:1,'populatelist.次數':1}}])
      const userModel=await UserModel.aggregate([{$match:{date:{$gte:new Date(moment(req.query.date).startOf('month')),$lt:new Date(moment(req.query.date).add(1,'day'))},subject:{ $nin: ["欠123切券", "欠運途券", "欠魂魄券"] } }},
      {$group:{_id:["$name",{$substr:["$subject",0,3]}],subject:{$push:"$$ROOT"},count:{$sum:1}}},{$lookup:{from:'information',localField:'_id',foreignField:'姓名',as:'populatelist'}},{$sort:{time:1,name:1}}])


       //const userModel=await UserModel.aggregate([{$match:{date:{$gte:new Date(moment(req.query.date)),$lt:new Date(moment(req.query.date).add(1,'d'))},subject:{ $nin: ["欠123切券", "欠運途券", "欠魂魄券"] } }},
       //{$group:{_id:["$name","$subject"],count:{$sum:1}}},{$project:{date:1,subject:1,time:1,count:1}}])
      
      //{date:{$gte:req.query.date,$lt:moment(req.query.date).add(1,'d')}}
      //{date:{$gte:new Date(req.query.date),$lt:new Date(moment(req.query.date).add(1,'d'))}}
      //{subject:{$nin:["欠123切券","欠運途券","欠魂魄券"]}}
      //
      res.status(200).json(userModel)

})

const updateUserProfile = asyncHandler(async (req, res) => {
      const information = await Information.findByIdAndUpdate(req.body._id, {
            生日: req.body.生日, 住址: req.body.住址,推薦人:req.body.推薦人,次數:req.body.次數
      })
      res.status(200).json(information);
})

const updateCheckBox = asyncHandler(async (req, res) => {
      const userModel= await UserModel.findByIdAndUpdate(req.params.id, {
           check:req.body.check
      })
      res.status(200).json(userModel);
})


const deleteUserProfile = asyncHandler(async (req, res) => {
      const userModel = await UserModel.findByIdAndDelete(req.params.id)  
      res.status(200).json(userModel)
})


const couponUser = asyncHandler(async (req, res) => {
      const userModel = await UserModel.find({ subject: { $in: ["欠123切券", "欠運途券", "欠魂魄券"] } }).sort({ date: -1 })
      res.status(200).json(userModel)
})

const searchData = asyncHandler(async (req, res) => {

      const userModel = await UserModel.find({subject: { $nin: ["運-1", "運-2", "運-3","魂-1","魂-2","魂-3","運毒"] }, name: req.query.name }).sort({ date: -1 }).limit(25)
      const userItem = await UserModel.find({subject: { $in: ["運-1", "運-2", "運-3","魂-1","魂-2","魂-3","運毒"] }, name: req.query.name }).sort({ date: -1 })
      const inforMation =await Information.find({姓名:req.query.name})
      res.status(200).json({data1:userModel,data2:userItem,data3:inforMation})     
})




export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, deleteUserProfile, couponUser, searchData,updateCheckBox } 