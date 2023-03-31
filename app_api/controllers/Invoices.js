const mongoose = require('mongoose');
const Cus = mongoose.model('Customer');

const sendJSONResponse = require('./SharedFunctions');

const invoicesReadAll = (req, res) => {
    Cus
      .findById(req.params.customerid)
      .select('invoices')
      .exec((err, invoices)=>{
        if(!invoices) {
            sendJSONResponse(res, 404, {"message":"invoices not found"});
            return;
        } else if(err){
            sendJSONResponse(res, 404, err);
            return;
        }
        sendJSONResponse(res, 200, invoices);
      });
};


const doAddInvoice = (req, res, customer)=>{
    let invoiceItems = [];
    let productName = '';
    let quantity = 0;
    let invoice = {};
    let summary = '';
    let profit = 0;
    let expense = 0;
    let amount = 0;

    const thisQuotation = customer.quotations.id(req.params.quotationid);
    const quotationId = thisQuotation._id;
    
    for(let i = 0; i < thisQuotation.quoteItems.length; i++) {
        product = thisQuotation.quoteItems[i].product;
        quantity = thisQuotation.quoteItems[i].quantity;
        description = thisQuotation.quoteItems[i].description;
        productAmount = thisQuotation.quoteItems[i].productAmount;
        summary += `${quantity} x ${product}, `;
        profit = thisQuotation.profit;
        amount = thisQuotation.amount;
        expense = thisQuotation.expense;
        invoiceItems.push({
               product,
               quantity,
               description,
               productAmount
        });
    }
    
    invoice = {
        invoiceItems,
        summary,
        profit,
        expense,
        amount
    };
    customer.invoices.push(invoice);
    customer.save((err, customer)=>{
        if(err) {
            sendJSONResponse(res, 400, err);
        } else {
            console.log('hell-no', customer.invoices);
            sendJSONResponse(res, 201, invoice);
        }
    });
};

const invoicesCreateOne = (req, res) => {
    Cus
    .findById(req.params.customerid)
    .exec((err, customer)=>{
      if(!customer) {
          sendJSONResponse(res, 404, {"message":"customer not found"});
          return;
      } else if(err) {
          sendJSONResponse(res, 400, err);
          return;
      }
      doAddInvoice(req, res, customer);
    });
};

const invoicesReadOne = (req, res) => {
    Cus
      .findById(req.params.customerid)
      .select('name invoices')
      .exec((err, customer)=>{
        if(!customer) {
            sendJSONResponse(res, 404, {"message":"invalid customer id"});
            return;
        } else if(err) {
            sendJSONResponse(res, 404, err);
            return;            
        }
        if(customer.invoices && customer.invoices.length > 0) {
            const thisInvoice = customer.invoices.id(req.params.invoiceid);
            if(!thisInvoice) {
                sendJSONResponse(res,404, {"message":"invalid invoice id"});
                return;
            }
            const response = {
                customer: customer.name,
                id: req.params.customerid,
                invoice: thisInvoice
            };
            sendJSONResponse(res, 200, thisInvoice);
            return;
        } else {
            sendJSONResponse(res, 404, {"message":"no invoices found"});
        }
      });  
};
const invoicesUpdateOne = (req, res) => {
    if(!req.params.customerid || !req.params.invoiceid) {
        sendJSONResponse(res, 404, {"message":"customer id and invoice id both required"});
        return;
    }
    Cus
      .findById(req.params.customerid)
      .exec((err, customer)=>{
        if(err) {
            sendJSONResponse(res, 404, err);
            return;
        } else if(!customer) {
            sendJSONResponse(res, 404, {"message":"customer not found"});
            return;
        }
        if(customer.invoices && customer.invoices.length > 0) {
            const thisInvoice = customer.invoices.id(req.params.invoiceid);
            if(thisInvoice) {
                thisInvoice.invoiceItems = [{
                    product: req.body.p1,
                    quantity: req.body.q1      
                }, {
                    product: req.body.p2,
                    quantity: req.body.q2      
                }];
                customer.save((err, cus)=>{
                    if(err) {
                        sendJSONResponse(res, 404, err);
                        return;
                    } else {
                        sendJSONResponse(res, 200, thisInvoice);
                    }
                });
            } else {
                sendJSONResponse(res, 404, {"message":"invoice not found"})
            }
        }
      });
};
const invoicesDeleteOne = (req, res) => {
    const {customerid, invoiceid} = req.params;
    if(!customerid || !invoiceid) {
        sendJSONResponse(res, 404, {"message":"both customer id and invoice id required"});
        return;
    }
    Cus
      .findById(customerid)
      .select('invoices')
      .exec((err, customer)=>{
        if(err) {
            sendJSONResponse(res, 404, err);
            return;
        } else if(!customer) {
            sendJSONResponse(res, 404, {"message":"customer not found"});
            return;
        }
        if(customer.invoices && customer.invoices.length>0) {
            if(!customer.invoices.id(invoiceid)) {
                sendJSONResponse(res, 404, {"message":"invoice not found"});
                return;
            }
            customer.invoices.id(invoiceid).remove();
            customer.save(err=>{
                if(err) {
                    sendJSONResponse(res, 404, err);
                    return;
                }
                sendJSONResponse(res, 204, null);
            });

        } else {
            sendJSONResponse(res, 404, {"message":"no invoices to delete"});
        }
      });

};

module.exports = {
    invoicesCreateOne,
    invoicesReadOne,
    invoicesUpdateOne,
    invoicesDeleteOne,
    invoicesReadAll
};
