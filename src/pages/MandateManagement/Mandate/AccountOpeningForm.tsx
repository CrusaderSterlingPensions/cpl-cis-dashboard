import { Page, Text, View, Document } from '@react-pdf/renderer';
import './styles';
import styles from './styles';
import logo from '../../assets/logo.png';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type optionsProps = {
  day: any;
  month: any;
  year: any;
};

const AccountOpeningForm = ({ data, images, signature }: any) => {
  const dateString = data?.DATE_OF_BIRTH;
  const date = new Date(dateString);
  const options: optionsProps = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  const formattedDate = date.toLocaleDateString('en-US', options);

  const emp_dateString = data?.DATE_EMPLOYED;
  const emp_date = new Date(emp_dateString);
  const emp_formattedDate = emp_date.toLocaleDateString('en-US', options);

  const renderImage = (imageBase64: any) => {
    const ImageData = imageBase64;
    if (ImageData !== undefined) {
      // const buffer = Buffer.from(ImageData.data);
      // const Base64 = buffer.toString('base64');
      return 'data:image/jpeg;base64,' + ImageData;
    }
  };

  const pictureImgSrc = renderImage(images) || logo;
  const signatureImgSrc = renderImage(signature) || logo;

  return (
    <Document>
      <Page size="A4" style={styles.main__body}>
        <View style={styles.main__page}>
          <View style={styles.top__container}>
            <View>
              <img src={logo} alt="app logo" style={styles.logo} />
            </View>
            <View style={styles.account__opening}>
              <Text style={styles.account__opening__text}>
                Account Opening form
              </Text>
            </View>
          </View>
          <View style={styles.form__block__container}>
            <View style={styles.line__one}>
              <View style={styles.form__container}>
                <Text style={styles.form__text}>Retirement Savings</Text>
                <Text style={styles.form__box}>X</Text>
              </View>
              <View style={styles.form__container}>
                <Text style={styles.form__text}>
                  Voluntary Contribution(VC)
                </Text>
                <Text style={styles.form__box}></Text>
              </View>
              <View style={styles.form__container}>
                <Text style={styles.form__text}>
                  Micro Pensions Contribution (MPC)
                </Text>
                <Text style={styles.form__box}></Text>
              </View>
            </View>
            <View style={styles.line__one}>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>
                  National Identification Number (NIN)
                </Text>
                <Text style={styles.form__box__medium}>{data?.NIN}</Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>
                  Bank Verification Number (BVN)
                </Text>
                <Text style={styles.form__box__11}>{data?.BVN}</Text>
              </View>
            </View>
            <View style={styles.line__one}>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Pin Number</Text>
                <Text style={styles.form__box__medium}>{data?.PIN}</Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Reference Number</Text>
                <Text style={styles.form__box__11}>{data?.FORM_REFNO}</Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Marketer Code</Text>
                <Text style={styles.form__box__8}> {data?.AGENT_CODE} </Text>
              </View>
            </View>
            <View style={styles.line__one}>
              <Text style={styles.form__text}>
                Please complete in BLOCK LETTERS
              </Text>
            </View>
          </View>
          <View style={styles.section__separators}>
            <Text style={styles.form__text__seperator}>
              1. Personal Details
            </Text>
          </View>
          <View style={styles.form__container__name__gender}>
            <View style={styles.form__block__container}>
              <View style={styles.line__one__personal}>
                <View style={styles.form__container_block}>
                  <Text style={styles.form__text}>Surname*</Text>
                  <Text style={styles.form__box__30}>{data?.SURNAME}</Text>
                </View>
              </View>
              <View style={styles.line__one__personal}>
                <View style={styles.form__container_block}>
                  <Text style={styles.form__text}>First Name*</Text>
                  <Text style={styles.form__box__20}>{data?.FIRSTNAME}</Text>
                </View>
                <View style={styles.form__container_block}>
                  <Text style={styles.form__text}>Title*</Text>
                  <Text style={styles.form__box__8}>{data?.TITLE}</Text>
                </View>
              </View>
              <View style={styles.line__one__personal}>
                <View style={styles.form__container_block}>
                  <Text style={styles.form__text}>Middle Name*</Text>
                  <Text style={styles.form__box__30}>{data?.OTHERNAMES}</Text>
                </View>
              </View>
            </View>
            <View style={styles.martial__gender}>
              <View style={styles.form__container_block_marital}>
                <Text style={styles.form__text_marital}>
                  Marital Status(M/S/D/W)*
                </Text>
                <Text style={styles.form__box}>
                  {data?.MARITAL_STATUS_CODE}
                </Text>
              </View>
              <View style={styles.form__container_block_marital}>
                <Text style={styles.form__text_marital}>Gender(M/F)*</Text>
                <Text style={styles.form__box}>{data?.GENDER}</Text>
              </View>
            </View>
          </View>
          <View style={styles.form__block__container}>
            <View style={styles.line__one__dob}>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Date of Birth(DD/MM/YYYY)</Text>
                <Text style={styles.form__box__12}>{formattedDate}</Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Place of Birth</Text>
                <Text style={styles.form__box__13}>{data?.PLACE_OF_BIRTH}</Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Maiden Name</Text>
                <Text style={styles.form__box__13}>{data?.MAIDEN_NAME}</Text>
              </View>
            </View>
            <View style={styles.line__one__dob}>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>{`Mother's Maiden Name*`}</Text>
                <Text style={styles.form__box__18}>{data?.MAIDEN_NAME}</Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>State of Origin*</Text>
                <Text style={styles.form__box__8}>{data?.STATE_OF_ORIGIN}</Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>LGA*</Text>
                <Text style={styles.form__box__6}>{data?.LGA_CODE}</Text>
              </View>
            </View>

            <View style={styles.line__one__dob}>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>
                  Current Home Address (Not P.O.Box)
                </Text>
                <Text style={styles.form__box__large}>
                  {data?.PERMANENT_ADDRESS}
                </Text>
                <Text style={styles.form__box__large}></Text>
              </View>
            </View>
            <View style={styles.line__one}>
              <View style={styles.form__container_block__phone}>
                <Text style={styles.form__text}>Phone Number*</Text>
                <Text style={styles.form__box__13}>{data?.MOBILE_PHONE}</Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Mobile Phone Number*</Text>
                <Text style={styles.form__box__13}>{data?.MOBILE_PHONE}</Text>
              </View>
            </View>
            <View style={styles.line__one__dob}>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>
                  Postal Address(if Different from the above)
                </Text>
                <Text style={styles.form__box__large}>
                  {data?.POSTING_LOCATION}
                </Text>
              </View>
            </View>
            <View style={styles.line__one__dob}>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>City/Town*</Text>
                <Text style={styles.form__box__18}>{data?.CITY}</Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>State*</Text>
                <Text style={styles.form__box__8}>
                  {data?.STATE_OF_POSTING}
                </Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Country*</Text>
                <Text style={styles.form__box__6}>{data?.PERM_COUNTRY}</Text>
              </View>
            </View>
            <View style={styles.line__one__dob}>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Email Address*</Text>
                <Text style={styles.form__box__large}>{data?.EMAIL}</Text>
              </View>
            </View>
            <View style={styles.line__one}>
              <View style={styles.form__container_block__phone}>
                <Text style={styles.form__text}>Nature of Business*</Text>
                <Text style={styles.form__box__13}>
                  {data?.EMPLOYER_BUSINESS}
                </Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Sector*</Text>
                <Text style={styles.form__box__13}>
                  {data?.EMPLOYER_INDUSTRY}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.section__separators}>
            <Text style={styles.form__text__seperator}>
              2. Employment Details
            </Text>
          </View>
          <View style={styles.form__block__container}>
            <View style={styles.line__one}>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Employer Code</Text>
                <Text style={styles.form__box__15}>{data?.EMPLOYER_RCNO}</Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Employer Service Number</Text>
                <Text style={styles.form__box__23}>{data?.EMPLOYER_PHONE}</Text>
              </View>
            </View>
            <View style={styles.line__one__dob}>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Name of Organization</Text>
                <Text style={styles.form__box__large}>
                  {data?.EMPLOYER_NAME}
                </Text>
              </View>
            </View>
            <View style={styles.line__one__dob}>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>
                  Office Address (Not P.O.Box)
                </Text>
                <Text style={styles.form__box__large}>
                  {data?.EMPLOYER_ADDRESS}
                </Text>
                <Text style={styles.form__box__large}></Text>
              </View>
            </View>
            <View style={styles.line__one__dob}>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Office Phone Number*</Text>
                <Text style={styles.form__box__11}>{data?.EMPLOYER_PHONE}</Text>
              </View>

              <View style={styles.date__employement__container}>
                <View style={styles.form__container_block}>
                  <Text style={styles.form__text}>
                    Date of Employment (DD/MM/YYY)*
                  </Text>
                  <Text style={styles.form__box__11}>{emp_formattedDate}</Text>
                </View>
                <View style={styles.form__container_block}>
                  <Text style={styles.form__text}>
                    Date of First Appointment (DD/MM/YYY)*
                  </Text>
                  <Text style={styles.form__box__11}></Text>
                </View>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Type of Employment*</Text>
                <View style={styles.type__employement__container}>
                  <View style={styles.form__container_}>
                    <Text style={styles.form__box}></Text>
                    <Text style={styles.form__text}>Full Time</Text>
                  </View>
                  <View style={styles.form__container_}>
                    <Text style={styles.form__box}></Text>
                    <Text style={styles.form__text}>Part Time*</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.line__one__dob}>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Designation*</Text>
                <Text style={styles.form__box__37}>{data?.DESIGNATION}</Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>State of Posting*</Text>
                <Text style={styles.form__box__6}>
                  {data?.STATE_OF_POSTING}
                </Text>
              </View>
            </View>
            <View style={styles.line__one}>
              <View style={styles.form__container_block__phone}>
                <Text style={styles.form__text}>Annual Basic Salary</Text>
                <Text style={styles.form__box__20}>
                  {data?.BASIC_ALLOWANCE}
                </Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Transport Allowance</Text>
                <Text style={styles.form__box__20}>
                  {data?.TRANSPORT_ALLOWANCE}
                </Text>
              </View>
            </View>
            <View style={styles.line__one}>
              <View style={styles.form__container_block__phone}>
                <Text style={styles.form__text}>Housing Allowance</Text>
                <Text style={styles.form__box__20}>
                  {data?.HOUSING_ALLOWANCE}
                </Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>
                  {`Employer's Monthly Contribution`}
                </Text>
                <Text style={styles.form__box__20}>
                  {data?.EMPLOYER_CONTRIBUTION}
                </Text>
              </View>
            </View>
            <View style={styles.line__one}>
              <View style={styles.form__container_block__phone}>
                <Text style={styles.form__text}>Your Monthly Contribution</Text>
                <Text style={styles.form__box__20}>
                  {data?.EMPLOYEE_CONTRIBUTION}
                </Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Rate of Contribution</Text>
                <View style={styles.conti_container}>
                  <View style={styles.form__container}>
                    <Text style={styles.form__text}>Employee</Text>
                    <Text style={styles.form__box}></Text>
                  </View>
                  <View style={styles.form__container}>
                    <Text style={styles.form__text}>Employer</Text>
                    <Text style={styles.form__box}></Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.line__one}>
              <View style={styles.form__container_block__phone}>
                <Text style={styles.form__text}>
                  Voluntary Contribution (VC)
                </Text>
                <Text style={styles.form__box__20}></Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>
                  *Asterisked Items are mandatory to filled
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
      <Page style={styles.main__body__2}>
        <View style={styles.main__page}>
          <View style={styles.top__container_2}>
            <img src={logo} style={styles.logo__2} alt="logo" />
          </View>
          <View style={styles.section__separators}>
            <Text style={styles.form__text__seperator}>3. Next of Kin</Text>
          </View>
          <View style={styles.form__block__container}>
            <View style={styles.line__one}>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Surname*</Text>
                <Text style={styles.form__box__25}>{data?.NOK_SURNAME}</Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Title</Text>
                <Text style={styles.form__box__10}>{data?.NOK_TITLE}</Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Gender (M/F)</Text>
                <Text style={styles.form__box__8}>{data?.NOK_GENDER}</Text>
              </View>
            </View>
            <View style={styles.line__one}>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>First Name*</Text>
                <Text style={styles.form__box__23}>{data?.NOK_NAME}</Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Middle Name*</Text>
                <Text style={styles.form__box__23}>{data?.NOK_OTHERNAME}</Text>
              </View>
            </View>
            <View style={styles.line__one}>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>
                  {' '}
                  Relationship (Husband/Wife/Son/Daughter/Brother/Sister/etc)*
                </Text>
                <Text style={styles.form__box__25}>
                  {data?.NOK_RELATIONSHIP}
                </Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>
                  Date of Birth (DD/MM/YYYY)*
                </Text>
                <Text style={styles.form__box__13}></Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Marital Status (M/S/D/W)*</Text>
                <Text style={styles.form__box}></Text>
              </View>
            </View>
            <View style={styles.line__one}>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>
                  {' '}
                  Residential Address (Not P.O.Box)*
                </Text>
                <Text style={styles.form__box__large}>{data?.NOK_ADDRESS}</Text>
              </View>
            </View>
            <View style={styles.line__one}>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>City*</Text>
                <Text style={styles.form__box__8}>{data?.NOK_CITY}</Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>State*</Text>
                <Text style={styles.form__box__8}>{data?.NOK_STATE}</Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Country*</Text>
                <Text style={styles.form__box__13}>{data?.NOK_COUNTRY}</Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Phone Number*</Text>
                <Text style={styles.form__box__15}>
                  {data?.NOK_MOBILE_PHONE}
                </Text>
              </View>
            </View>
            <View style={styles.line__one}>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}> Email Address*</Text>
                <Text style={styles.form__box__large}>
                  {data?.NOK_EMAILADDRESS}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section__separators}>
            <Text style={styles.form__text__seperator}>4. Contact Details</Text>
          </View>

          <View style={styles.form__block__container}>
            <Text style={styles.account__info__msg}>
              For your account statement and other correspondence, Please
              confirm you want them to be dispatched to you
            </Text>
            <Text style={styles.account__info__msg}>(please tick) via:</Text>
            <View>
              <View style={styles.line__one}>
                <View style={styles.form__container}>
                  <Text style={styles.form__box}></Text>
                  <Text style={styles.form__text}>Post</Text>
                </View>
                <View style={styles.form__container}>
                  <Text style={styles.form__box}></Text>
                  <Text style={styles.form__text}>Email</Text>
                </View>
                <View style={styles.form__container}>
                  <Text style={styles.form__box}></Text>
                  <Text style={styles.form__text}>Pick up</Text>
                </View>
                <View style={styles.form__container}>
                  <Text style={styles.form__box}></Text>
                  <Text style={styles.form__text}>
                    Others: specify______________
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.line__one__photo}>
              <View style={styles.form__container_block}>
                <View style={styles.form__box__photo}>
                  <img
                    src={pictureImgSrc}
                    style={styles.photograph}
                    alt="image"
                  />
                </View>
                <Text style={styles.form__text}>Photograph*</Text>
              </View>
              <View style={styles.form__container_block}>
                <View style={styles.form__container_signature}>
                  <img
                    src={signatureImgSrc}
                    style={styles.signature}
                    alt="image"
                  />
                </View>
                <Text style={styles.form__text}>Signature*</Text>
              </View>
              <View style={styles.form__container_block}>
                <Text style={styles.form__text}>Date (DD/MM/YYYY)</Text>
                <Text style={styles.form__box__10}></Text>
              </View>
            </View>
            <Text style={styles.privacy__notice}>PRIVACY NOTICE:</Text>
            <Text
              style={{
                ...styles.account__info__msg,
                marginTop: 5,
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              {
                'Crusader Sterling Pension Limited (CPL) is committed to protecting your personal data. This will be processed lawfully; maintained for its original purpose; retained no longer than necessary and kept securely. The information will be used majorly for the purpose of pension Fund Administration and Management.'
              }
            </Text>
            <Text
              style={{
                ...styles.account__info__msg,
                marginTop: 5,
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              {
                'You could update your personal details by sending a mail to info@crusaderpensions.com or call yemi on 01-2714605. For more details, please read up our data privacy policy on this link:http://www.crusaderpensions.com/data-privacy-policy'
              }
            </Text>
          </View>

          <View style={styles.section__separators}>
            <Text style={styles.form__text__seperator}>5. Consent</Text>
          </View>
          <View style={styles.form__block__container}>
            <View style={styles.consent__container}>
              <Text style={styles.consent__statement}>
                I hereby certify that the information provided in this form is
                correct.
              </Text>
              <Text style={styles.consent__statement}>
                I further consent and authorize National Identity Management
                Commission to release my NIN information(as may be required) to
                the National Pension Commission(PenCom), upon request by my
                Pension Fund Administrator, for the maintenance and operation of
                my Retirement Savings Account. It is my Understanding that
                PenCom shall exercise due care to ensure that my information is
                secured and protected.
              </Text>
              <View style={styles.signature__date}>
                <View style={styles.customer__sign}>
                  <View style={styles.sign__line}></View>
                  <Text style={styles.customer__signature}>
                    Customer Signature
                  </Text>
                </View>
                <View style={styles.customer__sign}>
                  <View style={styles.sign__line}></View>
                  <Text style={styles.customer__signature}>Date</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.section__separators}>
            <Text style={styles.form__text__seperator}>Regional offices</Text>
          </View>
          <View
            style={{
              ...styles.signature__date,
              marginHorizontal: 20,
              paddingTop: 0,
            }}
          >
            <View>
              <Text style={styles.corporate__office}>
                CORPORATE HEAD OFFICE
              </Text>
              <Text style={styles.address__text}>14b, Keffi Street</Text>
              <Text style={styles.address__text}>
                Off Obafemi Awolowo Road,
              </Text>
              <Text style={styles.address__text}>S/W Ikoyi, Lagos</Text>
              <Text style={styles.address__text}>Tel: 012797250</Text>
            </View>
            <View>
              <Text style={styles.corporate__office}>PORT HARCOURT</Text>
              <Text style={styles.address__text}>No. 1A Evo Road,</Text>
              <Text style={styles.address__text}>Off Olu Obasanjo Road, </Text>
              <Text style={styles.address__text}>
                beside Peperoni Fast Food,
              </Text>
              <Text style={styles.address__text}>G.R.A, Port Harcourt, </Text>
              <Text style={styles.address__text}>
                Rivers State, Tel: 0706 374 2599
              </Text>
            </View>
            <View>
              <Text style={styles.corporate__office}>IBADAN</Text>
              <Text style={styles.address__text}>
                No. 18 Obafemi Awolowo way,
              </Text>
              <Text style={styles.address__text}>
                Opp, Nigerian Baptist Convention,
              </Text>
              <Text style={styles.address__text}>Oke Bola Ibadan</Text>
              <Text style={styles.address__text}>Tel: 08148807383</Text>
            </View>
            <View>
              <Text style={styles.corporate__office}>ABUJA</Text>
              <Text style={styles.address__text}>
                Suite F42, 4th Floor, River House,
              </Text>
              <Text style={styles.address__text}>
                83, Rapheal Sodeinde Street,
              </Text>
              <Text style={styles.address__text}>
                Opp Ministry of Finance, HQ.
              </Text>
              <Text style={styles.address__text}>
                CBD, Abuja Tel: 08137284995
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 13, alignSelf: 'center', color: 'brown' }}>
            We have offices in all the thirty six states of the federation
          </Text>
          <Text style={{ fontSize: 8, alignSelf: 'center', color: 'brown' }}>
            On completion, send to 14B Keffi street, Ikoyi, Lagos, Nigeria,
            P.M.B. 80174 or the nearest branch office
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default AccountOpeningForm;
