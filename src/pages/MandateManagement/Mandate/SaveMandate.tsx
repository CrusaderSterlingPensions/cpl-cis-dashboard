import { pdfjs } from 'react-pdf';
import logo from '../assets/logo.png';
import './style.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const SaveMandate = ({ data }: any) => {
  return (
    <div className="main__body">
      <div className="main__page">
        <div className="top__container">
          <img src={logo} alt="app logo" className="logo" />
          <div className="account__opening">
            <p className="account__opening__text">Account Opening form</p>
          </div>
        </div>
        <div className="form__block__container">
          <div className="line__one">
            <div className="form__container">
              <p className="form__text">Retirement Savings</p>
              <p className="form__box"></p>
            </div>
            <div className="form__container">
              <p className="form__text">Voluntary Contribution(VC)</p>
              <p className="form__box"></p>
            </div>
            <div className="form__container">
              <p className="form__text">Micro Pensions Contribution (MPC)</p>
              <p className="form__box"></p>
            </div>
          </div>
          <div className="line__one">
            <div className="form__container_block">
              <p className="form__text">National Identification Number (NIN)</p>
              <p className="form__box__medium"></p>
            </div>
            <div className="form__container_block">
              <p className="form__text">Bank Verification Number (BVN)</p>
              <p className="form__box__11">{data?.BVN}</p>
            </div>
          </div>
          <div className="line__one">
            <div className="form__container_block">
              <p className="form__text">Pin Number</p>
              <p className="form__box__medium">{data?.PIN}</p>
            </div>
            <div className="form__container_block">
              <p className="form__text">Reference Number</p>
              <p className="form__box__11"></p>
            </div>
            <div className="form__container_block">
              <p className="form__text">Marketer Code</p>
              <p className="form__box__8"></p>
            </div>
          </div>
          <div className="line__one">
            <p className="form__text">Please complete in BLOCK LETTERS</p>
          </div>
        </div>
        <div className="section__separators">
          <p className="form__text__seperator">1. Personal Details</p>
        </div>
        <div className="form__container__name__gender">
          <div className="form__block__container">
            <div className="line__one__personal">
              <div className="form__container_block">
                <p className="form__text">Surname*</p>
                <p className="form__box__30"></p>
              </div>
            </div>
            <div className="line__one__personal">
              <div className="form__container_block">
                <p className="form__text">First Name*</p>
                <p className="form__box__30">This is the text</p>
              </div>
            </div>
            <div className="line__one__personal">
              <div className="form__container_block">
                <p className="form__text">Middle Name*</p>
                <p className="form__box__30">MiddleName</p>
              </div>
            </div>
          </div>
          <div className="martial__gender">
            <div className="form__container_block_marital">
              <p className="form__text_marital">Marital Status(M/S/D/W)*</p>
              <p className="form__box">M</p>
            </div>
            <div className="form__container_block_marital">
              <p className="form__text_marital">Gender(M/F)*</p>
              <p className="form__box">F</p>
            </div>
          </div>
        </div>
        <div className="form__block__container">
          <div className="line__one__dob">
            <div className="form__container_block">
              <p className="form__text">Date of Birth(DD/MM/YYYY)</p>
              <p className="form__box__12">23/10/1989</p>
            </div>
            <div className="form__container_block">
              <p className="form__text">Place of Birth</p>
              <p className="form__box__13"></p>
            </div>
            <div className="form__container_block">
              <p className="form__text">Maiden Name</p>
              <p className="form__box__13"></p>
            </div>
          </div>
          <div className="line__one__dob">
            <div className="form__container_block">
              <p className="form__text">Mother's Maiden Name*</p>
              <p className="form__box__18"></p>
            </div>
            <div className="form__container_block">
              <p className="form__text">State of Origin*</p>
              <p className="form__box__8"></p>
            </div>
            <div className="form__container_block">
              <p className="form__text">LGA*</p>
              <p className="form__box__6"></p>
            </div>
          </div>

          <div className="line__one__dob">
            <div className="form__container_block">
              <p className="form__text">Current Home Address (Not P.O.Box)</p>
              <p className="form__box__large"></p>
              <p className="form__box__large"></p>
            </div>
          </div>
          <div className="line__one">
            <div className="form__container_block__phone">
              <p className="form__text">Phone Number*</p>
              <p className="form__box__13"></p>
            </div>
            <div className="form__container_block">
              <p className="form__text">Mobile Phone Number*</p>
              <p className="form__box__13"></p>
            </div>
          </div>
          <div className="line__one__dob">
            <div className="form__container_block">
              <p className="form__text">
                Postal Address(if Different from the above)
              </p>
              <p className="form__box__large"></p>
            </div>
          </div>
          <div className="line__one__dob">
            <div className="form__container_block">
              <p className="form__text">City/Town*</p>
              <p className="form__box__18"></p>
            </div>
            <div className="form__container_block">
              <p className="form__text">State*</p>
              <p className="form__box__8"></p>
            </div>
            <div className="form__container_block">
              <p className="form__text">Country*</p>
              <p className="form__box__6"></p>
            </div>
          </div>
          <div className="line__one__dob">
            <div className="form__container_block">
              <p className="form__text">Email Address*</p>
              <p className="form__box__large"></p>
            </div>
          </div>
          <div className="line__one">
            <div className="form__container_block__phone">
              <p className="form__text">Nature of Business*</p>
              <p className="form__box__13"></p>
            </div>
            <div className="form__container_block">
              <p className="form__text">Sector*</p>
              <p className="form__box__13"></p>
            </div>
          </div>
        </div>
        <div className="section__separators">
          <p className="form__text__seperator">2. Employment Details</p>
        </div>
        <div className="form__block__container">
          <div className="line__one">
            <div className="form__container_block">
              <p className="form__text">Employer Code</p>
              <p className="form__box__15"></p>
            </div>
            <div className="form__container_block">
              <p className="form__text">Employer Service Number</p>
              <p className="form__box__23"></p>
            </div>
          </div>
          <div className="line__one__dob">
            <div className="form__container_block">
              <p className="form__text">Name of Organization</p>
              <p className="form__box__large"></p>
            </div>
          </div>
          <div className="line__one__dob">
            <div className="form__container_block">
              <p className="form__text">Office Address (Not P.O.Box)</p>
              <p className="form__box__large"></p>
              <p className="form__box__large"></p>
            </div>
          </div>
          <div className="line__one__dob">
            <div className="form__container_block">
              <p className="form__text">Office Phone Number*</p>
              <p className="form__box__11"></p>
            </div>

            <div className="date__employement__container">
              <div className="form__container_block">
                <p className="form__text">Date of Employment (DD/MM/YYY)*</p>
                <p className="form__box__11"></p>
              </div>
              <div className="form__container_block">
                <p className="form__text">
                  Date of First Appointment (DD/MM/YYY)*
                </p>
                <p className="form__box__11"></p>
              </div>
            </div>
            <div className="form__container_block">
              <p className="form__text">Type of Employment*</p>
              <div className="type__employement__container">
                <div className="form__container_">
                  <p className="form__box"></p>
                  <p className="form__text">Full Time</p>
                </div>
                <div className="form__container_">
                  <p className="form__box"></p>
                  <p className="form__text">Part Time*</p>
                </div>
              </div>
            </div>
          </div>
          <div className="line__one__dob">
            <div className="form__container_block">
              <p className="form__text">Designation*</p>
              <p className="form__box__37"></p>
            </div>
            <div className="form__container_block">
              <p className="form__text">State of Posting*</p>
              <p className="form__box__6"></p>
            </div>
          </div>
          <div className="line__one">
            <div className="form__container_block__phone">
              <p className="form__text">Annual Basic Salary</p>
              <p className="form__box__20"></p>
            </div>
            <div className="form__container_block">
              <p className="form__text">Transport Allowance</p>
              <p className="form__box__20"></p>
            </div>
          </div>
          <div className="line__one">
            <div className="form__container_block__phone">
              <p className="form__text">Housing Allowance</p>
              <p className="form__box__20"></p>
            </div>
            <div className="form__container_block">
              <p className="form__text">Employer's Monthly Contribution</p>
              <p className="form__box__20"></p>
            </div>
          </div>
          <div className="line__one">
            <div className="form__container_block__phone">
              <p className="form__text">Your Monthly Contribution</p>
              <p className="form__box__20"></p>
            </div>
            <div className="form__container_block">
              <p className="form__text">Rate of Contribution</p>
              <div className="conti_container">
                <div className="form__container">
                  <p className="form__text">Employee</p>
                  <p className="form__box"></p>
                </div>
                <div className="form__container">
                  <p className="form__text">Employer</p>
                  <p className="form__box"></p>
                </div>
              </div>
            </div>
          </div>
          <div className="line__one">
            <div className="form__container_block__phone">
              <p className="form__text">Voluntary Contribution (VC)</p>
              <p className="form__box__20"></p>
            </div>
            <div className="form__container_block">
              <p className="form__text">
                *Asterisked Items are mandatory to filled
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------------------------------------- */}
      <div className="main__page">
        <div className="top__container_2">
          <img src={logo} alt="app logo" className="logo__2" />
        </div>
        <div className="section__separators">
          <p className="form__text__seperator">3. Next of Kin</p>
        </div>
        <div className="form__container__name__gender">
          <div className="form__block__container">
            <div className="line__one">
              <div className="form__container_block">
                <p className="form__text">Surname*</p>
                <p className="form__box__25"></p>
              </div>
              <div className="form__container_block">
                <p className="form__text">Title</p>
                <p className="form__box__10"></p>
              </div>
              <div className="form__container_block">
                <p className="form__text">Gender (M/F)</p>
                <p className="form__box__8"></p>
              </div>
            </div>
            <div className="line__one">
              <div className="form__container_block">
                <p className="form__text">First Name*</p>
                <p className="form__box__23"></p>
              </div>
              <div className="form__container_block">
                <p className="form__text">Middle Name*</p>
                <p className="form__box__23"></p>
              </div>
            </div>
            <div className="line__one">
              <div className="form__container_block">
                <p className="form__text">
                  {' '}
                  Relationship (Husband/Wife/Son/Daughter/Brother/Sister/etc)*
                </p>
                <p className="form__box__25"></p>
              </div>
              <div className="form__container_block">
                <p className="form__text">Date of Birth (DD/MM/YYYY)*</p>
                <p className="form__box__13"></p>
              </div>
              <div className="form__container_block">
                <p className="form__text">Marital Status (M/S/D/W)*</p>
                <p className="form__box"></p>
              </div>
            </div>
            <div className="line__one">
              <div className="form__container_block">
                <p className="form__text">
                  {' '}
                  Residential Address (Not P.O.Box)*
                </p>
                <p className="form__box__large"></p>
              </div>
            </div>
            <div className="line__one">
              <div className="form__container_block">
                <p className="form__text">City*</p>
                <p className="form__box__8"></p>
              </div>
              <div className="form__container_block">
                <p className="form__text">State*</p>
                <p className="form__box__8"></p>
              </div>
              <div className="form__container_block">
                <p className="form__text">Country*</p>
                <p className="form__box__13"></p>
              </div>
              <div className="form__container_block">
                <p className="form__text">Phone Number*</p>
                <p className="form__box__15"></p>
              </div>
            </div>
            <div className="line__one">
              <div className="form__container_block">
                <p className="form__text"> Email Address*</p>
                <p className="form__box__large"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="section__separators">
          <p className="form__text__seperator">4. Contact Details</p>
        </div>
        <div className="form__container__name__gender">
          <div className="form__block__container">
            <p className="account__info__msg">
              For your account statement and other correspondence, Please
              confirm you want them to be dispatched to you
            </p>
            <p className="account__info__msg">(please tick) via:</p>
            <div className="form__block__container">
              <div className="line__one">
                <div className="form__container">
                  <p className="form__box"></p>
                  <p className="form__text">Post</p>
                </div>
                <div className="form__container">
                  <p className="form__box"></p>
                  <p className="form__text">Email</p>
                </div>
                <div className="form__container">
                  <p className="form__box"></p>
                  <p className="form__text">Pick up</p>
                </div>
                <div className="form__container">
                  <p className="form__box"></p>
                  <p className="form__text">Others: specify______________</p>
                </div>
              </div>
            </div>
            <div className="line__one__photo">
              <div className="form__container_block">
                <div className="form__box__photo">
                  <img src={logo} alt="photograph" />
                </div>
                <p className="form__text">Photograph*</p>
              </div>
              <div className="form__container_block">
                <div className="form__container_signature">
                  <img src={logo} alt="signature" className="signature" />
                </div>
                <p className="form__text">Signature*</p>
              </div>
              <div className="form__container_block">
                <p className="form__text">Date (DD/MM/YYYY)</p>
                <p className="form__box__10"></p>
              </div>
            </div>
            <p className="account__info__msg add__margin__top">
              {
                'Crusader Sterling Pension Limited (CPL) is committed to protecting your personal data. This will be processed lawfully; maintained for its original purpose; retained no longer than necessary and kept securely. The information will be used majorly for the purpose of pension Fund Administration and Management.'
              }
            </p>
            <p className="account__info__msg add__margin__top">
              {
                'You could update your personal details by sending a mail to info@crusaderpensions or call yemi on 01-2714605. For more details, please read up our data privacy policy on this link:http://www.crusaderpensions.com/data-privacy-policy'
              }
            </p>
          </div>
        </div>
        <div className="section__separators">
          <p className="form__text__seperator">5. Consent</p>
        </div>
      </div>
    </div>
  );
};

export default SaveMandate;
