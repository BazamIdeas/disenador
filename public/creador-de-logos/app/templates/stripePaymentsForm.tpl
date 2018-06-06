<style>
    .StripeElement {
        background-color: white !important;
        height: 40px !important;
        padding: 10px 12px !important;
        border-radius: 4px !important;
        border: 1px solid transparent !important;
        box-shadow: 0 1px 3px 0 #e6ebf1 !important;
        -webkit-transition: box-shadow 150ms ease !important;
        transition: box-shadow 150ms ease !important;
    }

    .StripeElement--focus {
        box-shadow: 0 1px 3px 0 #cfd7df !important;
    }

    .StripeElement--invalid {
        border-color: #fa755a !important;
    }

    .StripeElement--webkit-autofill {
        background-color: #fefde5 !important;
    }

    #payment-form{
        position: fixed;
        top: calc(50% - 75px);
        left: calc(50% - 300px);
        height: 150px;
        width: 600px;
        background: #ffffff;
        padding: 40px;
        box-shadow: 0px 0px 2px 1px #d4d4d4;
    }

    #card-errors{
        color: maroon;
        font-family: 'futura-heavy' !important;
        font-size: 11px;
        padding-top: 8px;

    }

    #payment-form .boton-verde{
        position: absolute;
        top: 72%;
        width: 100px;
        left: 77%
    }

    #payment-form label{
        top: -10px;
        position: relative;
        font-size: 14px;
    }

</style>
<form id="payment-form">
    <div class="form-row">
      <label for="card-element">
        Tarjeta de Crédito o Débito
      </label>
      <div id="card-element">
        <!-- A Stripe Element will be inserted here. -->
      </div>
  
      <!-- Used to display form errors. -->
      <div id="card-errors" role="alert"></div>
    </div>
  
    <button class="boton-verde" ng-disable="!completadoPagar"  ng-class="{'loading-white': !completadoPagar}" ng-click="pagar()">PAGAR</button>
  </form>