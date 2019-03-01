import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SetFxModel } from '../../models/setfx.model';
import { Basis } from '../../enums/basis.enum';
import { AmortizationFrequency } from '../../enums/amortization-frequency.enum';
import { AmortizationType } from '../../enums/amortization-type.enum';
import { CashFlowPaymentAt } from '../../enums/cash-flow-payment-at.enum';

@Component({
  selector: 'app-detailsetfx',
  templateUrl: './detailsetfx.component.html',
  styleUrls: ['./detailsetfx.component.css']
})
export class DetailSetFxComponent implements OnInit {

  public basisEnumLoan: any;
  public basisEnumDepo: any;
  public amortizationFrecuencyEnumLoan: any;
  public amortizationFrecuencyEnumDepo: any;
  public amortizationTypeEnumLoan: any;
  public amortizationTypeEnumDepo: any;
  public paymentAtEnumLoan: any;
  public paymentAtEnumDepo: any;


  public tradeDate: any;
  public startDate: any;
  public maturityDate: any;

  constructor(public dialogRef: MatDialogRef<DetailSetFxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SetFxModel) { }


  /**
   * 
   */
  ngOnInit() {
    this.tradeDate = this.convertDate(this.data.MessageFormat.Swap.TradeDate);
    this.startDate = this.convertDate(this.data.MessageFormat.Swap.Loan.StartDate);
    this.maturityDate = this.convertDate(this.data.MessageFormat.Swap.Loan.MaturityDate);

    switch (this.data.MessageFormat.Swap.Loan.Basis) {
      case "A": this.basisEnumLoan = Basis.A.toString(); break;
      case "B": this.basisEnumLoan = Basis.B.toString(); break;
      case "C": this.basisEnumLoan = Basis.C.toString(); break;
      case "2": this.basisEnumLoan = Basis.C2.toString(); break;
      case "4": this.basisEnumLoan = Basis.C4.toString(); break;
      case "5": this.basisEnumLoan = Basis.C5.toString(); break;
      case "6": this.basisEnumLoan = Basis.C6.toString(); break;
      case "D": this.basisEnumLoan = Basis.D.toString(); break;
      case "E": this.basisEnumLoan = Basis.E.toString(); break;
      case "F": this.basisEnumLoan = Basis.F.toString(); break;
      case "I": this.basisEnumLoan = Basis.I.toString(); break;
      case "J": this.basisEnumLoan = Basis.J.toString(); break;
      case "M": this.basisEnumLoan = Basis.M.toString(); break;
      case "N": this.basisEnumLoan = Basis.N.toString(); break;
      case "Y": this.basisEnumLoan = Basis.Y.toString(); break;
      case "Z": this.basisEnumLoan = Basis.Z.toString(); break;

    }

    switch (this.data.MessageFormat.Swap.Depo.Basis) {
      case "A": this.basisEnumDepo = Basis.A.toString(); break;
      case "B": this.basisEnumDepo = Basis.B.toString(); break;
      case "C": this.basisEnumDepo = Basis.C.toString(); break;
      case "2": this.basisEnumDepo = Basis.C2.toString(); break;
      case "4": this.basisEnumDepo = Basis.C4.toString(); break;
      case "5": this.basisEnumDepo = Basis.C5.toString(); break;
      case "6": this.basisEnumDepo = Basis.C6.toString(); break;
      case "D": this.basisEnumDepo = Basis.D.toString(); break;
      case "E": this.basisEnumDepo = Basis.E.toString(); break;
      case "F": this.basisEnumDepo = Basis.F.toString(); break;
      case "I": this.basisEnumDepo = Basis.I.toString(); break;
      case "J": this.basisEnumDepo = Basis.J.toString(); break;
      case "M": this.basisEnumDepo = Basis.M.toString(); break;
      case "N": this.basisEnumDepo = Basis.N.toString(); break;
      case "Y": this.basisEnumDepo = Basis.Y.toString(); break;
      case "Z": this.basisEnumDepo = Basis.Z.toString(); break;

    }


    switch (this.data.MessageFormat.Swap.Loan.AmortizingType) {
      case "N": this.amortizationTypeEnumLoan = AmortizationType.N.toString(); break;
      case "A": this.amortizationTypeEnumLoan = AmortizationType.A.toString(); break;
      case "F": this.amortizationTypeEnumLoan = AmortizationType.F.toString(); break;
      case "L": this.amortizationTypeEnumLoan = AmortizationType.L.toString(); break;
      case "O": this.amortizationTypeEnumLoan = AmortizationType.O.toString(); break;
      case "V": this.amortizationTypeEnumLoan = AmortizationType.V.toString(); break;
    }

    switch (this.data.MessageFormat.Swap.Depo.AmortizingType) {
      case "N": this.amortizationTypeEnumDepo = AmortizationType.N.toString(); break;
      case "A": this.amortizationTypeEnumDepo = AmortizationType.A.toString(); break;
      case "F": this.amortizationTypeEnumDepo = AmortizationType.F.toString(); break;
      case "L": this.amortizationTypeEnumDepo = AmortizationType.L.toString(); break;
      case "O": this.amortizationTypeEnumDepo = AmortizationType.O.toString(); break;
      case "V": this.amortizationTypeEnumDepo = AmortizationType.V.toString(); break;
    }

    switch (this.data.MessageFormat.Swap.Loan.AmortizationFrequency) {
      case "A": this.amortizationFrecuencyEnumLoan = AmortizationFrequency.A.toString(); break;
      case "B": this.amortizationFrecuencyEnumLoan = AmortizationFrequency.B.toString(); break;
      case "0": this.amortizationFrecuencyEnumLoan = AmortizationFrequency.C0.toString(); break;
      case "D": this.amortizationFrecuencyEnumLoan = AmortizationFrequency.D.toString(); break;
      case "H": this.amortizationFrecuencyEnumLoan = AmortizationFrequency.H.toString(); break;
      case "M": this.amortizationFrecuencyEnumLoan = AmortizationFrequency.M.toString(); break;
      case "Q": this.amortizationFrecuencyEnumLoan = AmortizationFrequency.Q.toString(); break;
      case "S": this.amortizationFrecuencyEnumLoan = AmortizationFrequency.S.toString(); break;
      case "W": this.amortizationFrecuencyEnumLoan = AmortizationFrequency.W.toString(); break;
    }

    switch (this.data.MessageFormat.Swap.Depo.AmortizationFrequency) {
      case "A": this.amortizationFrecuencyEnumDepo = AmortizationFrequency.A.toString(); break;
      case "B": this.amortizationFrecuencyEnumDepo = AmortizationFrequency.B.toString(); break;
      case "0": this.amortizationFrecuencyEnumDepo = AmortizationFrequency.C0.toString(); break;
      case "D": this.amortizationFrecuencyEnumDepo = AmortizationFrequency.D.toString(); break;
      case "H": this.amortizationFrecuencyEnumDepo = AmortizationFrequency.H.toString(); break;
      case "M": this.amortizationFrecuencyEnumDepo = AmortizationFrequency.M.toString(); break;
      case "Q": this.amortizationFrecuencyEnumDepo = AmortizationFrequency.Q.toString(); break;
      case "S": this.amortizationFrecuencyEnumDepo = AmortizationFrequency.S.toString(); break;
      case "W": this.amortizationFrecuencyEnumDepo = AmortizationFrequency.W.toString(); break;
    }

    switch (this.data.MessageFormat.Swap.Loan.PaymentAt) {
      case "B": this.paymentAtEnumLoan = CashFlowPaymentAt.B.toString(); break;
      case "E": this.paymentAtEnumLoan = CashFlowPaymentAt.E.toString(); break;
      case "R": this.paymentAtEnumLoan = CashFlowPaymentAt.R.toString(); break;
      case "S": this.paymentAtEnumLoan = CashFlowPaymentAt.S.toString(); break;
    }

    switch (this.data.MessageFormat.Swap.Depo.PaymentAt) {
      case "B": this.paymentAtEnumDepo = CashFlowPaymentAt.B.toString(); break;
      case "E": this.paymentAtEnumDepo = CashFlowPaymentAt.E.toString(); break;
      case "R": this.paymentAtEnumDepo = CashFlowPaymentAt.R.toString(); break;
      case "S": this.paymentAtEnumDepo = CashFlowPaymentAt.S.toString(); break;
    }

  }

  convertDate(strDate: string): string {
    strDate = strDate.trim();
    return strDate.substring(6) + "/" + strDate.substring(4, 6) + "/" + strDate.substring(0, 4);
  }
}


