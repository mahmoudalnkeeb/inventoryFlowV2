const router = require('express').Router();

router.get('/' , (req , res)=>{
    res.render('index')
});
router.get('/ar' , (req , res)=>{
    res.render('ar')
});
router.get('/about-us' , (req , res)=>{
    res.render('about-us');
});
router.get('/about-us-ar' , (req , res)=>{
    res.render('about-us-ar');
});
router.get('/sold' , (req , res)=>{
    res.render('sold')
});
router.get('/sold-ar' , (req , res)=>{
    res.render('sold-ar')
});

module.exports = router;
