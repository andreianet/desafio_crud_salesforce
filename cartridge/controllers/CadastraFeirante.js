
'use strict';
​
var server = require('server');
​
server.get('Landing', server.middleware.https, function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var actionUrl = URLUtils.url('CadastraFeirante-Subscribe').toString();
    var feiranteForm = server.forms.getForm('cadastro_feirante');
    feiranteForm.clear();

    res.render('cadastro_feirante', {
        actionURL: actionUrl,
        feiranteForm: feiranteForm
    });
    next();
});
​
server.post('Subscribe', server.middleware.https, function (req, res, next) {
   // var Resource = require('dw/web/Resource');
    var feiranteForm = server.forms.getForm('cadastro_feirante');
   // var emailHelper = require('*/cartridge/scripts/helpers/emailHelpers');
   // var myForm = req.form;
    var customObjMgr = require('dw/object/CustomObjectMgr');
    var transaction = require('dw/system/Transaction');
    transaction.begin();
    try{
        var newSubscribe = customObjMgr.createCustomObject('marketer', feiranteForm.email.value);
        newSubscribe.custom.email = feiranteForm.email.value;
        newSubscribe.custom.fullname = feiranteForm.fullname.value;
        newSubscribe.custom.phone = feiranteForm.phone.value;
      //  newSubscribe.custom.Message = contactForm.message.value;
      //  var contactDetails = [myForm.name, myForm.email, myForm.phone, myForm.message];
        // res.json({
        //     success: true,
        //     msg: Resource.msg('success.message', 'form', null)
        // });
        res.render('cadastro_feirante_sucesso', {
            feiranteForm: feiranteForm
        });
    }catch(e) {
        //Oops!
        transaction.rollback();
       }




      /*  var isValidEmailid = emailHelper.validateEmail(myForm.email);
    if (isValidEmailid) {
        var contactDetails = [ myForm.name, myForm.email, myForm.phone];
        res.json({
            success: true,
            msg: Resource.msg('subscribe.to.contact.us.success', 'contact', null)
        });
    }  else {
        res.json({
            error: true,
            msg: Resource.msg('subscribe.to.contact.us.email.invalid', 'contact', null)
        });
    }*/
   return next();
});

module.exports = server.exports();