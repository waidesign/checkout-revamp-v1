import { useState, forwardRef, useImperativeHandle } from 'react';
import { Lock, CreditCard, ChevronDown, ShieldCheck } from 'lucide-react';
import applePayIcon from '../assets/images/applepay.svg';
import googlePayIcon from '../assets/images/googlepay.svg';
import paypalIcon from '../assets/images/paypal.svg';
import visaIcon from '../assets/images/visa.svg';
import masterIcon from '../assets/images/master.svg';
import amexIcon from '../assets/images/amex.svg';
import discoverIcon from '../assets/images/discover.svg';

interface PaymentFormProps {
  totalPrice: string;
}

export interface PaymentFormHandle {
  triggerValidation: () => void;
}

const PaymentForm = forwardRef<PaymentFormHandle, PaymentFormProps>(function PaymentForm({ totalPrice }, ref) {
  const [fields, setFields] = useState({ cardNumber: '', expiry: '', cvc: '', zip: '' });
  const [touched, setTouched] = useState({ cardNumber: false, expiry: false, cvc: false, zip: false });

  const errors = {
    cardNumber: !fields.cardNumber.trim(),
    expiry: !fields.expiry.trim(),
    cvc: !fields.cvc.trim(),
    zip: !fields.zip.trim(),
  };

  const hasError = (field: keyof typeof errors) => touched[field] && errors[field];

  const inputClass = (field: keyof typeof errors) =>
    `block w-full rounded-xl px-4 py-3 h-[48px] text-slate-900 bg-white border transition-all outline-none ${
      hasError(field)
        ? 'border-red-400 ring-1 ring-red-400 bg-red-50 placeholder:text-red-300'
        : 'border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
    }`;

  useImperativeHandle(ref, () => ({
    triggerValidation() {
      // Mark all fields as touched to show errors
      setTouched({ cardNumber: true, expiry: true, cvc: true, zip: true });

      // Scroll to first empty field
      const fieldIds: Array<[keyof typeof errors, string]> = [
        ['cardNumber', 'cc-number'],
        ['expiry', 'cc-exp'],
        ['cvc', 'cc-csc'],
        ['zip', 'postal-code'],
      ];
      for (const [field, id] of fieldIds) {
        if (errors[field]) {
          const el = document.getElementById(id);
          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => el?.focus(), 400);
          break;
        }
      }
    },
  }));

  return (
    <div className="space-y-8">
      {/* Express Payment Options */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Express Checkout</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Apple Pay Button */}
          <button 
            type="button"
            className="flex items-center justify-center w-full bg-black rounded-xl h-12 hover:bg-neutral-800 active:scale-[0.98] transition-all duration-150 shadow-sm cursor-pointer px-4"
            aria-label="Pay with Apple Pay"
          >
            <img src={applePayIcon} alt="Apple Pay" className="h-5 w-auto brightness-0 invert" />
          </button>

          {/* Google Pay Button */}
          <button 
            type="button"
            className="flex items-center justify-center w-full bg-white border border-slate-200 rounded-xl h-12 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all duration-150 shadow-sm cursor-pointer px-4"
            aria-label="Pay with Google Pay"
          >
            <img src={googlePayIcon} alt="Google Pay" className="h-5 w-auto" />
          </button>

          {/* PayPal Button */}
          <button 
            type="button"
            className="flex items-center justify-center w-full bg-[#FFC439] hover:bg-[#F3BC33] active:scale-[0.98] rounded-xl h-12 transition-all duration-150 shadow-sm cursor-pointer px-4"
            aria-label="Pay with PayPal"
          >
            <img src={paypalIcon} alt="PayPal" className="h-5 w-auto" />
          </button>
        </div>
      </div>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
        <div className="relative flex justify-center"><span className="bg-white px-4 text-xs font-medium text-slate-500 uppercase tracking-wider">or pay with card</span></div>
      </div>

      {/* Card Form */}
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900">Payment Details</h3>
          <div className="flex items-center gap-1.5">
            <img src={visaIcon} alt="Visa" className="h-6 w-auto" />
            <img src={masterIcon} alt="Mastercard" className="h-6 w-auto" />
            <img src={amexIcon} alt="American Express" className="h-6 w-auto" />
            <img src={discoverIcon} alt="Discover" className="h-6 w-auto" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="cc-number" className={`block text-sm font-medium mb-1.5 ${hasError('cardNumber') ? 'text-red-500' : 'text-slate-700'}`}>Card Number{hasError('cardNumber') && <span className="ml-1 font-normal">— required</span>}</label>
            <div className="relative">
              <input
                type="text"
                id="cc-number"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="0000 0000 0000 0000"
                value={fields.cardNumber}
                onChange={e => setFields(f => ({ ...f, cardNumber: e.target.value }))}
                onBlur={() => setTouched(t => ({ ...t, cardNumber: true }))}
                className={`block w-full rounded-xl pl-11 pr-4 py-3 h-[48px] text-slate-900 bg-white border transition-all outline-none ${
                  hasError('cardNumber')
                    ? 'border-red-400 ring-1 ring-red-400 bg-red-50 placeholder:text-red-300'
                    : 'border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                }`}
              />
              <CreditCard className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 ${hasError('cardNumber') ? 'text-red-400' : 'text-slate-400'}`} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="cc-exp" className={`block text-sm font-medium mb-1.5 ${hasError('expiry') ? 'text-red-500' : 'text-slate-700'}`}>Expiration{hasError('expiry') && <span className="ml-1 font-normal">— required</span>}</label>
              <input
                type="text"
                id="cc-exp"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM / YY"
                value={fields.expiry}
                onChange={e => setFields(f => ({ ...f, expiry: e.target.value }))}
                onBlur={() => setTouched(t => ({ ...t, expiry: true }))}
                className={inputClass('expiry')}
              />
            </div>
            <div>
              <label htmlFor="cc-csc" className={`block text-sm font-medium mb-1.5 ${hasError('cvc') ? 'text-red-500' : 'text-slate-700'}`}>CVC{hasError('cvc') && <span className="ml-1 font-normal">— required</span>}</label>
              <input
                type="text"
                id="cc-csc"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="123"
                value={fields.cvc}
                onChange={e => setFields(f => ({ ...f, cvc: e.target.value }))}
                onBlur={() => setTouched(t => ({ ...t, cvc: true }))}
                className={inputClass('cvc')}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-slate-700 mb-1.5">Country</label>
              <div className="relative">
                <select
                  id="country"
                  autoComplete="country"
                  className="block w-full rounded-xl border-slate-200 px-4 py-3 pr-10 h-[48px] text-slate-900 bg-white border focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all outline-none appearance-none cursor-pointer"
                >
                  <option value="US">United States</option>
                  <option value="AF">Afghanistan</option>
                  <option value="AL">Albania</option>
                  <option value="DZ">Algeria</option>
                  <option value="AD">Andorra</option>
                  <option value="AO">Angola</option>
                  <option value="AG">Antigua and Barbuda</option>
                  <option value="AR">Argentina</option>
                  <option value="AM">Armenia</option>
                  <option value="AU">Australia</option>
                  <option value="AT">Austria</option>
                  <option value="AZ">Azerbaijan</option>
                  <option value="BS">Bahamas</option>
                  <option value="BH">Bahrain</option>
                  <option value="BD">Bangladesh</option>
                  <option value="BB">Barbados</option>
                  <option value="BY">Belarus</option>
                  <option value="BE">Belgium</option>
                  <option value="BZ">Belize</option>
                  <option value="BJ">Benin</option>
                  <option value="BT">Bhutan</option>
                  <option value="BO">Bolivia</option>
                  <option value="BA">Bosnia and Herzegovina</option>
                  <option value="BW">Botswana</option>
                  <option value="BR">Brazil</option>
                  <option value="BN">Brunei</option>
                  <option value="BG">Bulgaria</option>
                  <option value="BF">Burkina Faso</option>
                  <option value="BI">Burundi</option>
                  <option value="CV">Cabo Verde</option>
                  <option value="KH">Cambodia</option>
                  <option value="CM">Cameroon</option>
                  <option value="CA">Canada</option>
                  <option value="CF">Central African Republic</option>
                  <option value="TD">Chad</option>
                  <option value="CL">Chile</option>
                  <option value="CN">China</option>
                  <option value="CO">Colombia</option>
                  <option value="KM">Comoros</option>
                  <option value="CG">Congo</option>
                  <option value="CR">Costa Rica</option>
                  <option value="HR">Croatia</option>
                  <option value="CU">Cuba</option>
                  <option value="CY">Cyprus</option>
                  <option value="CZ">Czech Republic</option>
                  <option value="DK">Denmark</option>
                  <option value="DJ">Djibouti</option>
                  <option value="DM">Dominica</option>
                  <option value="DO">Dominican Republic</option>
                  <option value="EC">Ecuador</option>
                  <option value="EG">Egypt</option>
                  <option value="SV">El Salvador</option>
                  <option value="GQ">Equatorial Guinea</option>
                  <option value="ER">Eritrea</option>
                  <option value="EE">Estonia</option>
                  <option value="SZ">Eswatini</option>
                  <option value="ET">Ethiopia</option>
                  <option value="FJ">Fiji</option>
                  <option value="FI">Finland</option>
                  <option value="FR">France</option>
                  <option value="GA">Gabon</option>
                  <option value="GM">Gambia</option>
                  <option value="GE">Georgia</option>
                  <option value="DE">Germany</option>
                  <option value="GH">Ghana</option>
                  <option value="GR">Greece</option>
                  <option value="GD">Grenada</option>
                  <option value="GT">Guatemala</option>
                  <option value="GN">Guinea</option>
                  <option value="GW">Guinea-Bissau</option>
                  <option value="GY">Guyana</option>
                  <option value="HT">Haiti</option>
                  <option value="HN">Honduras</option>
                  <option value="HU">Hungary</option>
                  <option value="IS">Iceland</option>
                  <option value="IN">India</option>
                  <option value="ID">Indonesia</option>
                  <option value="IR">Iran</option>
                  <option value="IQ">Iraq</option>
                  <option value="IE">Ireland</option>
                  <option value="IL">Israel</option>
                  <option value="IT">Italy</option>
                  <option value="JM">Jamaica</option>
                  <option value="JP">Japan</option>
                  <option value="JO">Jordan</option>
                  <option value="KZ">Kazakhstan</option>
                  <option value="KE">Kenya</option>
                  <option value="KI">Kiribati</option>
                  <option value="KP">North Korea</option>
                  <option value="KR">South Korea</option>
                  <option value="KW">Kuwait</option>
                  <option value="KG">Kyrgyzstan</option>
                  <option value="LA">Laos</option>
                  <option value="LV">Latvia</option>
                  <option value="LB">Lebanon</option>
                  <option value="LS">Lesotho</option>
                  <option value="LR">Liberia</option>
                  <option value="LY">Libya</option>
                  <option value="LI">Liechtenstein</option>
                  <option value="LT">Lithuania</option>
                  <option value="LU">Luxembourg</option>
                  <option value="MG">Madagascar</option>
                  <option value="MW">Malawi</option>
                  <option value="MY">Malaysia</option>
                  <option value="MV">Maldives</option>
                  <option value="ML">Mali</option>
                  <option value="MT">Malta</option>
                  <option value="MH">Marshall Islands</option>
                  <option value="MR">Mauritania</option>
                  <option value="MU">Mauritius</option>
                  <option value="MX">Mexico</option>
                  <option value="FM">Micronesia</option>
                  <option value="MD">Moldova</option>
                  <option value="MC">Monaco</option>
                  <option value="MN">Mongolia</option>
                  <option value="ME">Montenegro</option>
                  <option value="MA">Morocco</option>
                  <option value="MZ">Mozambique</option>
                  <option value="MM">Myanmar</option>
                  <option value="NA">Namibia</option>
                  <option value="NR">Nauru</option>
                  <option value="NP">Nepal</option>
                  <option value="NL">Netherlands</option>
                  <option value="NZ">New Zealand</option>
                  <option value="NI">Nicaragua</option>
                  <option value="NE">Niger</option>
                  <option value="NG">Nigeria</option>
                  <option value="MK">North Macedonia</option>
                  <option value="NO">Norway</option>
                  <option value="OM">Oman</option>
                  <option value="PK">Pakistan</option>
                  <option value="PW">Palau</option>
                  <option value="PA">Panama</option>
                  <option value="PG">Papua New Guinea</option>
                  <option value="PY">Paraguay</option>
                  <option value="PE">Peru</option>
                  <option value="PH">Philippines</option>
                  <option value="PL">Poland</option>
                  <option value="PT">Portugal</option>
                  <option value="QA">Qatar</option>
                  <option value="RO">Romania</option>
                  <option value="RU">Russia</option>
                  <option value="RW">Rwanda</option>
                  <option value="KN">Saint Kitts and Nevis</option>
                  <option value="LC">Saint Lucia</option>
                  <option value="VC">Saint Vincent and the Grenadines</option>
                  <option value="WS">Samoa</option>
                  <option value="SM">San Marino</option>
                  <option value="ST">Sao Tome and Principe</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="SN">Senegal</option>
                  <option value="RS">Serbia</option>
                  <option value="SC">Seychelles</option>
                  <option value="SL">Sierra Leone</option>
                  <option value="SG">Singapore</option>
                  <option value="SK">Slovakia</option>
                  <option value="SI">Slovenia</option>
                  <option value="SB">Solomon Islands</option>
                  <option value="SO">Somalia</option>
                  <option value="ZA">South Africa</option>
                  <option value="SS">South Sudan</option>
                  <option value="ES">Spain</option>
                  <option value="LK">Sri Lanka</option>
                  <option value="SD">Sudan</option>
                  <option value="SR">Suriname</option>
                  <option value="SE">Sweden</option>
                  <option value="CH">Switzerland</option>
                  <option value="SY">Syria</option>
                  <option value="TW">Taiwan</option>
                  <option value="TJ">Tajikistan</option>
                  <option value="TZ">Tanzania</option>
                  <option value="TH">Thailand</option>
                  <option value="TL">Timor-Leste</option>
                  <option value="TG">Togo</option>
                  <option value="TO">Tonga</option>
                  <option value="TT">Trinidad and Tobago</option>
                  <option value="TN">Tunisia</option>
                  <option value="TR">Turkey</option>
                  <option value="TM">Turkmenistan</option>
                  <option value="TV">Tuvalu</option>
                  <option value="UG">Uganda</option>
                  <option value="UA">Ukraine</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="UK">United Kingdom</option>
                  <option value="UY">Uruguay</option>
                  <option value="UZ">Uzbekistan</option>
                  <option value="VU">Vanuatu</option>
                  <option value="VA">Vatican City</option>
                  <option value="VE">Venezuela</option>
                  <option value="VN">Vietnam</option>
                  <option value="YE">Yemen</option>
                  <option value="ZM">Zambia</option>
                  <option value="ZW">Zimbabwe</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="postal-code" className={`block text-sm font-medium mb-1.5 ${hasError('zip') ? 'text-red-500' : 'text-slate-700'}`}>ZIP Code{hasError('zip') && <span className="ml-1 font-normal">— required</span>}</label>
              <input
                type="text"
                id="postal-code"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="10001"
                value={fields.zip}
                onChange={e => setFields(f => ({ ...f, zip: e.target.value }))}
                onBlur={() => setTouched(t => ({ ...t, zip: true }))}
                className={inputClass('zip')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee */}
      <div className="space-y-4 pt-4">
        <div className="space-y-3">
          <button 
            id="pay-button" 
            type="button"
            onClick={() => {
              // Trigger validation via imperative handle logic directly
              setTouched({ cardNumber: true, expiry: true, cvc: true, zip: true });
              const fieldIds: Array<[keyof typeof errors, string]> = [
                ['cardNumber', 'cc-number'],
                ['expiry', 'cc-exp'],
                ['cvc', 'cc-csc'],
                ['zip', 'postal-code'],
              ];
              for (const [field, id] of fieldIds) {
                if (errors[field]) {
                  const el = document.getElementById(id);
                  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  setTimeout(() => el?.focus(), 400);
                  break;
                }
              }
            }}
            className="w-full h-14 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 active:scale-[0.99] transition-all duration-150 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            Pay ${totalPrice}
            <Lock className="w-4 h-4" />
          </button>
          <div className="flex items-center justify-center pt-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>Guaranteed 256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 text-center">
            <span className="font-semibold text-slate-900">100% money-back guarantee</span> if the report doesn't deliver.
          </p>
        </div>
      </div>
    </div>
  );
});

export default PaymentForm;
