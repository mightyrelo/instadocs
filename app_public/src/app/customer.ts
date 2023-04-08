export class QuoteItem {
    product: string;
    quantity: number;
    productAmount: number;
    description: string;
    summary: string;
    productExpense: number;
}

export class QuoteItem2 {
    panel: string;
    quantityP: number;
    panelAmount: number;
    inverter: string;
    quantityI: number;
    inverterAmount: number;
    roof: string;
    quantityR: number;
    roofAmount: number;
    pvAmount: number;
    description: string;
    summary: string;
    panelExpense: number;
    inverterExpense: number;
    roofExpense: number;
    roofDescription: string;
    panelDescription: string
    invDescription: string;
    labourAmount: number;
    labourDescription: string;
    labourExpense: number;
    quantityL: number;
    mc4Amount: number;
    mc4Description: string;
    mc4Expense: number;
    quantityMC: number;

}

export class QuoteItem3 {
    distribution: string;
    quantityDSB: number;
    dsbAmount: number;
    dsbDescription: string;
    dsbExpense: number;

    consumables: string;
    quantityCons: number;
    consAmount: number;
    consDescription: string;
    consExpense: number;

    acProt: string;
    quantityACProt: number;
    acProtAmount: number;
    acProtDescription: string;
    acProtExpense: number;

    cova: string;
    quantityCov: number;
    covAmount: number;
    covDescription: string;
    covExpense: number;

    mcb: string;
    quantityMCB: number;
    mcbAmount: number;
    mcbDescription: string;
    mcbExpense: number;

    surgProt: string;
    quantitySurg: number;
    surgAmount: number;
    surgDescription: string;
    surgExpense: number;

    avr: string;
    quantityAvr: number;
    avrAmount: number;
    avrDescription: string;
    avrExpense: number;
    summary: string;

}

export class Quote {
    _id: string;
    quoteItems: QuoteItem[];
    summary: string;
    amount: number;
    expense: number;
    profit: number;
    flagged: boolean;
}


export class Invoice {
    _id: string;
    invoiceItems: QuoteItem[];
    summary: string;
    amount: number;
    expense: number;
    profit: number;
    flagged: boolean;
}

export class Customer {
    name: string;
    _id: string;
    address: string;
    contact: number;
    rating: number;
    facilities: string[];
    createdOn: string;
    quotations: Quote[];
    invoices: any[];
    gender: string;
    email: string;
    flagged: boolean;
    userId: string;
}
