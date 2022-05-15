/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useEffect, useRef } from 'react'
import useState from 'react-usestateref'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { Formik, Form, FormikValues, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import { StepperComponent } from '../../../assets/ts/components'
import axios, { AxiosResponse } from 'axios'
import { initialQuotations, Quotations } from '../../../../app/modules/quotations/quotations-list/core/_models'
import { ID, Response } from '../../../../_metronic/helpers'
import { Companies, CompaniesQueryResponse } from '../../../../app/modules/companies/companies-list/core/_models'

const API_URL = process.env.REACT_APP_THEME_API_URL
const QUOTATIONS_URL = `${API_URL}/quotations/register`
const GET_COMPANIES_URL = `${API_URL}/company/?`


const createQuotations = (quotation: Quotations): Promise<Quotations | undefined> => {

  return axios
    .post(QUOTATIONS_URL, quotation)
    .then((response: AxiosResponse<Response<Quotations>>) => response.data)
    .then((response: Response<Quotations>) => {
      console.log('wedssdsdsd')
      return response.data
    })
}

const getCompanies = (text: String): Promise<CompaniesQueryResponse> => {
  return axios
    .get(`${GET_COMPANIES_URL}${text}`)
    .then((d: AxiosResponse<CompaniesQueryResponse>) => d.data)
}


const createQuotationSchema = [
  Yup.object({
    name: Yup.string().required().label('Quotation name'),
    invoiceNo: Yup.string().required().label('Invoice number'),
    type: Yup.string().required().label('Quotation type'),
  }),
  Yup.object({
    company: Yup.string().required().label('Company'),
  }),
  Yup.object({
    workType: Yup.string().required().label('Work type'),
    quotations: Yup.array().of(
      Yup.object({
        desc: Yup.string()
          .required()
          .label('Description'),
        amount: Yup.number()
          .required()
          .label('Amount')
      })
    ).min(1, 'Quotations')
  }),
  Yup.object({
    paymentTerm: Yup.array().of(
      Yup.object({
        percentage: Yup.number()
          .required()
          .label('Percentage'),
        desc: Yup.string()
          .required()
          .label('Description'),
        amount: Yup.number()
          .required()
          .label('Amount')
      })
    ).min(1, 'Payment Term'),
    balancePaid: Yup.number()
      .required()
      .label('Balance paid'),
    nextPaymentDate: Yup.date()
      .required()
      .label('Next date'),
    finalPaymentDate: Yup.date()
      .required()
      .label('Final date')
  }),
  Yup.object({
    projectSchedule: Yup.array().of(
      Yup.object({
        desc: Yup.string()
          .required()
          .label('Description'),
        week: Yup.string()
          .required()
          .label('Week'),
        remark: Yup.string()
          .required()
          .label('Remark')
      })
    ).min(1, 'Project schedule')
  }),
  Yup.object({
    workType: Yup.string().required().label('Work type'),
    cardNumber: Yup.string().required().label('Card Number'),
    cardExpiryMonth: Yup.string().required().label('Expiration Month'),
    cardExpiryYear: Yup.string().required().label('Expiration Year'),
    cardCvv: Yup.string().required().label('CVV'),
  }),
]
//address
// projectSchedule?: Array<Object>,
// note?: String,
// poc?: String,
// contact?: String,
// isFinished?: Boolean,

const Main: FC = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [currentSchema, setCurrentSchema] = useState(createQuotationSchema[0])
  const [company, setCompany, refCompany] = useState<Companies[]>()
  const [initValues] = useState<Quotations>(initialQuotations)

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()

    setCurrentSchema(createQuotationSchema[stepper.current.currentStepIndex - 1])
  }

  const submitStep = async (values: Quotations, actions: FormikValues) => {


    console.log("values")


    if (!stepper.current) {
      return
    }

    setCurrentSchema(createQuotationSchema[stepper.current.currentStepIndex])

    console.log(values)
    console.log(stepper.current)


    if (stepper.current.currentStepIndex === 1) {
      values.company = ""
      var { data } = await getCompanies(values.type ? values.type : "")
      setCompany(data)

    }

    if (stepper.current.currentStepIndex !== stepper.current.totatStepsNumber) {
      stepper.current.goNext()
    } else {
      // stepper.current.goto(1)


      var nnew = {
        company: "6277f498434b29f22cb97ce3", //must be companies id
        type: values.type,
        name: values.name,
        invoiceNo: values.invoiceNo,
        address: values.address,
        quotations: values.quotations,
        balancePaid: values.balancePaid,
        nextPaymentDate: values.nextPaymentDate,
        finalPaymentDate: values.finalPaymentDate,
        paymentTerm: values.paymentTerm,
        projectSchedule: values.projectSchedule,
        note: values.note,
        poc: values.poc,
        contact: values.contact,
        isFinished: values.isFinished,
        workType: values.workType
      }

      console.log(nnew)



      await createQuotations(nnew)

      actions.resetForm()
    }
  }

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper()
  }, [stepperRef])

  return (
    <div className='modal fade' id='kt_modal_create_app' aria-hidden='true'>
      <div className='modal-dialog modal-dialog-centered mw-1000px'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h2>Create Quotation</h2>

            <div className='btn btn-sm btn-icon btn-active-color-primary' data-bs-dismiss='modal'>
              <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
            </div>
          </div>

          <div className='modal-body py-lg-10 px-lg-10'>
            <div
              ref={stepperRef}
              className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
              id='kt_modal_create_app_stepper'
            >
              <div className='d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px'>
                <div className='stepper-nav ps-lg-10'>
                  <div className='stepper-item current' data-kt-stepper-element='nav'>
                    <div className='stepper-line w-40px'></div>

                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>1</span>
                    </div>

                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Name & Invoice number</h3>

                      <div className='stepper-desc'>Name your Quotation project</div>
                    </div>
                  </div>

                  <div className='stepper-item' data-kt-stepper-element='nav'>
                    <div className='stepper-line w-40px'></div>

                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>2</span>
                    </div>

                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Companies</h3>

                      <div className='stepper-desc'>Select company</div>
                    </div>
                  </div>

                  <div className='stepper-item' data-kt-stepper-element='nav'>
                    <div className='stepper-line w-40px'></div>

                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>3</span>
                    </div>

                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Quotation Details (1)</h3>

                      <div className='stepper-desc'>Work type & proposed fee</div>
                    </div>
                  </div>

                  <div className='stepper-item' data-kt-stepper-element='nav'>
                    <div className='stepper-line w-40px'></div>

                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>4</span>
                    </div>

                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Quotation Details (2)</h3>

                      <div className='stepper-desc'>schedule, balance, dates</div>
                    </div>
                  </div>

                  <div className='stepper-item' data-kt-stepper-element='nav'>
                    <div className='stepper-line w-40px'></div>

                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>5</span>
                    </div>

                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Quotation Details (3)</h3>

                      <div className='stepper-desc'>project schedule</div>
                    </div>
                  </div>

                  <div className='stepper-item' data-kt-stepper-element='nav'>
                    <div className='stepper-line w-40px'></div>

                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>6</span>
                    </div>

                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Address and POC</h3>

                      <div className='stepper-desc'>Provide payment details</div>
                    </div>
                  </div>

                  <div className='stepper-item' data-kt-stepper-element='nav'>
                    <div className='stepper-line w-40px'></div>

                    <div className='stepper-icon w-40px h-40px'>
                      <i className='stepper-check fas fa-check'></i>
                      <span className='stepper-number'>7</span>
                    </div>

                    <div className='stepper-label'>
                      <h3 className='stepper-title'>Release</h3>

                      <div className='stepper-desc'>Review and Submit</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex-row-fluid py-lg-5 px-lg-15'>
                <Formik
                  validationSchema={currentSchema}
                  initialValues={initValues}
                  onSubmit={submitStep}
                >
                  {(formikProps) => (
                    <Form className='form' noValidate id='kt_modal_create_app_form'>
                      <div className='current' data-kt-stepper-element='content'>
                        <div className='w-100'>
                          <div className='fv-row mb-10'>
                            <label className='d-flex align-items-center fs-5 fw-bold mb-2'>
                              <span className='required'>Invoice Number</span>
                            </label>

                            <Field
                              type='text'
                              className='form-control form-control-lg form-control-solid'
                              name='invoiceNo'
                              placeholder='Invoice no'
                            />
                            <div className='text-danger'>
                              <ErrorMessage name='invoiceNo' />
                            </div>
                          </div>

                          <div className='fv-row mb-10'>
                            <label className='d-flex align-items-center fs-5 fw-bold mb-2'>
                              <span className='required'>Quotation Name</span>
                              {/* <i
                                className='fas fa-exclamation-circle ms-2 fs-7'
                                data-bs-toggle='tooltip'
                                title='Specify your unique quotation name'
                              ></i> */}
                            </label>

                            <Field
                              type='text'
                              className='form-control form-control-lg form-control-solid'
                              name='name'
                              placeholder='name'
                            />
                            <div className='text-danger'>
                              <ErrorMessage name='name' />
                            </div>
                          </div>

                          <div className='fv-row'>
                            <label className='d-flex align-items-center fs-5 fw-bold mb-4'>
                              <span className='required'>Quotation type</span>

                              {/* <i
                                className='fas fa-exclamation-circle ms-2 fs-7'
                                data-bs-toggle='tooltip'
                                title='Select your app type'
                              ></i> */}
                            </label>

                            <div className='fv-row'>
                              <label className='d-flex flex-stack mb-5 cursor-pointer'>
                                <span className='d-flex align-items-center me-2'>
                                  <span className='symbol symbol-50px me-6'>
                                    <span className='symbol-label bg-light-primary'>
                                      <KTSVG
                                        path='/media/icons/duotune/maps/map004.svg'
                                        className='svg-icon-1 svg-icon-primary'
                                      />
                                    </span>
                                  </span>

                                  <span className='d-flex flex-column'>
                                    <span className='fw-bolder fs-6'>Regular Quotation</span>

                                    <span className='fs-7 text-muted'>
                                      A quotation from us to other companies
                                    </span>
                                  </span>
                                </span>

                                <span className='form-check form-check-custom form-check-solid'>
                                  <Field
                                    className='form-check-input'
                                    type='radio'
                                    name='type'
                                    value='Regular'
                                  />
                                </span>
                              </label>

                              <label className='d-flex flex-stack mb-5 cursor-pointer'>
                                <span className='d-flex align-items-center me-2'>
                                  <span className='symbol symbol-50px me-6'>
                                    <span className='symbol-label bg-light-danger  '>
                                      <KTSVG
                                        path='/media/icons/duotune/general/gen024.svg'
                                        className='svg-icon-1 svg-icon-danger'
                                      />
                                    </span>
                                  </span>

                                  <span className='d-flex flex-column'>
                                    <span className='fw-bolder fs-6'>Sub-Consultant Quotation</span>

                                    <span className='fs-7 text-muted'>
                                      A quotation from other companies to us
                                    </span>
                                  </span>
                                </span>

                                <span className='form-check form-check-custom form-check-solid'>
                                  <Field
                                    className='form-check-input'
                                    type='radio'
                                    name='type'
                                    value='Sub-consultant'
                                  />
                                </span>
                              </label>


                            </div>

                            <div className='text-danger'>
                              <ErrorMessage name='type' />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div data-kt-stepper-element='content'>
                        <div className='w-100'>
                          <div className='fv-row'>
                            <label className='d-flex align-items-center fs-5 fw-bold'>
                              <span className='required'>Select company</span>
                              {/* <i
                                className='fas fa-exclamation-circle ms-2 fs-7'
                                data-bs-toggle='tooltip'
                                title='Specify your project company'
                              ></i> */}
                            </label>
                            <p className='fs-7 mb-6' ><i>If company is not in the list, please add first at the companies page</i></p>


                            <div style={{ height: 300, overflowY: 'scroll' }}>
                              {refCompany.current ?

                                refCompany.current.length > 0 ?
                                  (
                                    refCompany.current.map((company: Companies, i) => {
                                      return <label key={i} className='d-flex flex-stack cursor-pointer mb-5'>
                                        <span className='d-flex align-items-center me-2'>
                                          <span className='symbol symbol-50px me-6'>
                                            {company.avatar ? (
                                              <div className='symbol-label'>
                                                <img
                                                  src={toAbsoluteUrl(`/media/${company.avatar}`)}
                                                  className='h-100 w-100'
                                                  style={{ objectFit: 'cover' }}
                                                />
                                              </div>
                                            ) : (
                                              <div className='symbol-label'>
                                                <img src={toAbsoluteUrl('/media/avatars/blank.png')} className='w-100' />
                                              </div>
                                            )}
                                          </span>

                                          <span className='d-flex flex-column'>
                                            <span className='fw-bolder fs-6'>{company.name}</span>

                                            <span className='fs-7 text-muted'>{company.type} Quotation</span>
                                          </span>
                                        </span>

                                        <span className='form-check form-check-custom form-check-solid me-8'>
                                          <Field
                                            className='form-check-input'
                                            type='radio'
                                            name='company'
                                            value={company.id}
                                          />
                                        </span>
                                      </label>
                                    })) : <></>

                                : <></>
                              }

                            </div>
                          </div>
                          <div className='text-danger'>
                            <ErrorMessage name='company' />
                          </div>
                        </div>
                      </div>

                      <div data-kt-stepper-element='content'>
                        <div className='w-100'>
                          <div className='fv-row mb-3'>
                            <label className='d-flex align-items-center fs-5 fw-bold mb-4'>
                              <span className='required'>Select Work Type</span>

                              {/* <i
                                className='fas fa-exclamation-circle ms-2 fs-7'
                                data-bs-toggle='tooltip'
                                title='Select your app database engine'
                              ></i> */}
                            </label>

                            <label className='d-flex flex-stack cursor-pointer mb-5'>
                              <span className='d-flex align-items-center me-2'>
                                {/* <span className='symbol symbol-50px me-6'>
                                  <span className='symbol-label bg-light-success'>
                                    <i className='fas fa-database text-success fs-2x'></i>
                                  </span>
                                </span> */}

                                <Field as='select' name='workType' style={{ textOverflow: 'ellipsis' }} className="form-select" aria-label="Default select example">
                                  <option value="EIT">Environmental Impact Asssesment</option>
                                  <option value="EMT">Environmental Mark Assesment</option>
                                  <option value="DSR">Dynamic Search Rescue</option>
                                </Field>

                              </span>
                            </label>
                          </div>
                          <div className='text-danger mb-10'>
                            <ErrorMessage name='workType' />
                          </div>

                          <div className='fv-row mb-10'>
                            <label className='required fs-5 fw-bold mb-2'>Proposed Fee</label>


                            <FieldArray name="quotations">
                              {(arrayHelpers) => {

                                return (
                                  <div>
                                    {formikProps.values.quotations ?
                                      formikProps.values.quotations.map((value: any, index) => {

                                        return (
                                          <div className='mb-10' key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                            <Field
                                              style={{ width: '60%' }}
                                              component="textarea" rows="3"
                                              className='form-control form-control-lg form-control-solid'
                                              name={`quotations.${index}.desc`}
                                              placeholder='Description'
                                            />

                                            <div style={{ width: '30%', margin: 'auto', marginRight: 0, display: 'flex', alignItems: 'center' }}>
                                              <b style={{ marginRight: 7 }}>RM</b>
                                              <Field
                                                type="number"
                                                rows="1"
                                                min="0"
                                                className='form-control form-control-lg form-control-solid'
                                                name={`quotations.${index}.amount`}
                                                placeholder='Amount'
                                              />
                                              {index >= 1 ?
                                                <img style={{ cursor: 'pointer', position: 'absolute', right: 0, marginRight: '5%' }} onClick={() => arrayHelpers.remove(index)} src={toAbsoluteUrl('/media/icons/duotune/general/trash.png')}></img>
                                                : <></>}
                                            </div>
                                            <></>

                                          </div>
                                        );
                                      }) : <></>}
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      <button type='button' onClick={() => arrayHelpers.push({ desc: '', amount: 0 })}>Add more fields</button>

                                      <p style={{ display: 'flex', margin: 'auto', alignItems: 'center', marginRight: 0, width: '30%' }}><b>Total RM: </b>
                                        <span style={{ marginLeft: 10 }}>{formikProps.values.quotations!.reduce((sum, item: any) => sum + item.amount, 0)}</span></p>
                                    </div>
                                  </div>
                                )
                              }}
                            </FieldArray>
                          </div>

                          <div className='fv-row'>

                            {formikProps.values.quotations ?
                              formikProps.values.quotations.map((quotations: any, index) => {

                                return (

                                  <div key={index}><div className='text-danger'>
                                    <ErrorMessage name={`quotations.${index}.desc`} />
                                  </div><div className='text-danger'>
                                      <ErrorMessage name={`quotations.${index}.amount`} />
                                    </div></div>

                                );
                              }) : <></>}

                          </div>


                        </div>
                      </div>

                      {/* 4 */}
                      <div data-kt-stepper-element='content'>
                        <div className='w-100'>

                          <div className='fv-row'>
                            <label className='required fs-5 fw-bold mb-2'>Payment Schedule</label>

                            <FieldArray name="paymentTerm">
                              {(arrayHelpers) => {

                                return (
                                  <div>
                                    {formikProps.values.paymentTerm ?
                                      formikProps.values.paymentTerm.map((value: any, index) => {

                                        return (
                                          <div className='mb-10' key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ width: '20%', display: 'flex', alignItems: 'center' }}>
                                              <b style={{ marginRight: 7 }}>%</b>
                                              <Field
                                                type="number"
                                                rows="1"
                                                className='form-control form-control-lg form-control-solid'
                                                name={`paymentTerm.${index}.percentage`}
                                                placeholder=''
                                              />
                                            </div>

                                            <Field
                                              style={{ width: '40%', marginLeft: 20 }}
                                              component="textarea" rows="1"
                                              className='form-control form-control-lg form-control-solid'
                                              name={`paymentTerm.${index}.desc`}
                                              placeholder='Description'
                                            />

                                            <div style={{ width: '30%', margin: 'auto', marginRight: 0, display: 'flex', alignItems: 'center' }}>
                                              <b style={{ marginRight: 7 }}>RM</b>
                                              <Field
                                                type="number"
                                                className='form-control form-control-lg form-control-solid'
                                                name={`paymentTerm.${index}.amount`}
                                                placeholder='Amount'
                                              />
                                              {index >= 1 ?
                                                <img style={{ cursor: 'pointer', position: 'absolute', right: 0, marginRight: '5%' }} onClick={() => arrayHelpers.remove(index)} src={toAbsoluteUrl('/media/icons/duotune/general/trash.png')}></img>
                                                : <></>}
                                            </div>
                                            <></>

                                          </div>
                                        );
                                      }) : <></>}
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      <button type='button' onClick={() => arrayHelpers.push({ percentage: 0, desc: '', amount: 0 })}>Add more fields</button>

                                      <p style={{ display: 'flex', margin: 'auto', alignItems: 'center', marginRight: 0, width: '30%' }}><b>Total RM: </b>
                                        <span style={{ marginLeft: 10 }}>{formikProps.values.paymentTerm!.reduce((sum, item: any) => sum + item.amount, 0)}</span></p>
                                    </div>
                                  </div>
                                )
                              }}
                            </FieldArray>
                          </div>

                          <div className='fv-row mb-10'>

                            {formikProps.values.paymentTerm ?
                              formikProps.values.paymentTerm.map((value: any, index) => {

                                return (

                                  <div key={index}>
                                    <div className='text-danger'>
                                      <ErrorMessage name={`paymentTerm.${index}.percentage`} />
                                    </div>
                                    <div className='text-danger'>
                                      <ErrorMessage name={`paymentTerm.${index}.desc`} />
                                    </div>
                                    <div className='text-danger'>
                                      <ErrorMessage name={`paymentTerm.${index}.amount`} />
                                    </div></div>

                                );
                              }) : <></>}

                          </div>
                          <div className='fv-row mb-7'>
                            <label className='d-flex align-items-center fs-5 fw-bold mb-4'>
                              <span className='required'>Balance Paid</span>

                              {/* <i
                                className='fas fa-exclamation-circle ms-2 fs-7'
                                data-bs-toggle='tooltip'
                                title='Select your app database engine'
                              ></i> */}
                            </label>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <b style={{ marginRight: 7 }}>RM</b>
                              <Field
                                type='number'
                                className='form-control form-control-lg form-control-solid'
                                name='balancePaid'
                                min="0"
                                placeholder='Balance paid'
                              />
                              <div className='text-danger'>
                                <ErrorMessage name='balancePaid' />
                              </div>
                            </div>
                          </div>
                          <div className='fv-row'>
                            <label style={{ justifyContent: 'space-between' }} className='d-flex align-items-center fs-5 fw-bold mb-4'>
                              <span style={{ width: "40%" }}
                                className='required'>Next payment date:</span>
                              <span style={{ width: "40%" }}
                                className='required'>Final payment date:</span>
                            </label>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <div style={{ width: "40%" }}>
                                <Field
                                  type='date'
                                  className='form-control form-control-lg form-control-solid'
                                  name='nextPaymentDate'
                                />
                                <div className='text-danger'>
                                  <ErrorMessage name='nextPaymentDate' />
                                </div>

                              </div>

                              <div style={{ width: "40%" }}>
                                <Field
                                  type='date'
                                  className='form-control form-control-lg form-control-solid'
                                  name='finalPaymentDate'
                                />
                                <div className='text-danger'>
                                  <ErrorMessage name='finalPaymentDate' />
                                </div>

                              </div>

                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 5 */}
                      <div data-kt-stepper-element='content'>
                        <div className='w-100'>

                          <div className='fv-row mb-10'>
                            <label className='required fs-5 fw-bold mb-2'>Proposed project schedule</label>


                            <FieldArray name="projectSchedule">
                              {(arrayHelpers) => {

                                return (
                                  <div>
                                    {formikProps.values.projectSchedule ?
                                      formikProps.values.projectSchedule.map((value: any, index) => {

                                        return (
                                          <div className='mb-10' key={index}>
                                            <Field
                                              style={{ width: '100%' }}
                                              component="textarea" rows="3"
                                              className='form-control form-control-lg form-control-solid mb-5'
                                              name={`projectSchedule.${index}.desc`}
                                              placeholder='Description'
                                            />

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                              <Field
                                                style={{ width: '30%' }}
                                                type="text"
                                                className='form-control form-control-lg form-control-solid'
                                                name={`projectSchedule.${index}.week`}
                                                placeholder='Week'
                                              />

                                              <div style={{ width: '60%', display: 'flex', alignItems: 'center' }}>

                                                <Field
                                                  component="textarea" rows="2"
                                                  className='form-control form-control-lg form-control-solid'
                                                  name={`projectSchedule.${index}.remark`}
                                                  placeholder='Remark'
                                                />

                                                {index >= 1 ?
                                                  <img style={{ cursor: 'pointer', position: 'absolute', right: 0, marginRight: '5%' }} onClick={() => arrayHelpers.remove(index)} src={toAbsoluteUrl('/media/icons/duotune/general/trash.png')}></img>
                                                  : <></>}
                                              </div>

                                            </div>

                                            <div className="divider mt-3">{index + 1}</div>

                                            <></>

                                          </div>
                                        );
                                      }) : <></>}
                                    <button type='button' onClick={() => arrayHelpers.push({ desc: '', week: '', remark: '' })}>Add more fields</button>
                                  </div>

                                )
                              }}
                            </FieldArray>
                          </div>

                          <div className='fv-row'>

                            {formikProps.values.projectSchedule ?
                              formikProps.values.projectSchedule.map((value: any, index) => {

                                return (

                                  <div key={index}>
                                    <div className='text-danger'>
                                      <ErrorMessage name={`projectSchedule.${index}.desc`} />
                                    </div>
                                    <div className='text-danger'>
                                      <ErrorMessage name={`projectSchedule.${index}.week`} />
                                    </div>
                                    <div className='text-danger'>
                                      <ErrorMessage name={`projectSchedule.${index}.remark`} />
                                    </div>
                                  </div>

                                );
                              }) : <></>}

                          </div>


                        </div>
                      </div>


                      <div data-kt-stepper-element='content'>
                        <div className='w-100'>
                          <div className='pb-10 pb-lg-15'>
                            <h2 className='fw-bolder text-dark'>Billing Details</h2>

                            <div className='text-gray-400 fw-bold fs-6'>
                              If you need more info, please check out
                              <a href='#' className='text-primary fw-bolder'>
                                Help Page
                              </a>
                              .
                            </div>
                          </div>
                          <div className='d-flex flex-column mb-7 fv-row'>
                            <label className='d-flex align-items-center fs-6 fw-bold form-label mb-2'>
                              <span className='required'>Name On Card</span>
                              <i
                                className='fas fa-exclamation-circle ms-2 fs-7'
                                data-bs-toggle='tooltip'
                                title="Specify a card holder's name"
                              ></i>
                            </label>

                            <Field
                              type='text'
                              className='form-control form-control-solid'
                              placeholder=''
                              name='workType'
                            />
                            <div className='text-danger'>
                              <ErrorMessage name='workType' />
                            </div>
                          </div>
                          <div className='d-flex flex-column mb-7 fv-row'>
                            <label className='required fs-6 fw-bold form-label mb-2'>
                              Card Number
                            </label>

                            <div className='position-relative'>
                              <Field
                                type='text'
                                className='form-control form-control-solid'
                                placeholder='Enter card number'
                                name='cardNumber'
                              />
                              <div className='text-danger'>
                                <ErrorMessage name='cardNumber' />
                              </div>

                              <div className='position-absolute translate-middle-y top-50 end-0 me-5'>
                                <img
                                  src={toAbsoluteUrl('/media/svg/card-logos/visa.svg')}
                                  alt=''
                                  className='h-25px'
                                />
                                <img
                                  src={toAbsoluteUrl('/media/svg/card-logos/mastercard.svg')}
                                  alt=''
                                  className='h-25px'
                                />
                                <img
                                  src={toAbsoluteUrl('/media/svg/card-logos/american-express.svg')}
                                  alt=''
                                  className='h-25px'
                                />
                              </div>
                            </div>
                          </div>
                          <div className='row mb-10'>
                            <div className='col-md-8 fv-row'>
                              <label className='required fs-6 fw-bold form-label mb-2'>
                                Expiration Date
                              </label>

                              <div className='row fv-row'>
                                <div className='col-6'>
                                  <Field
                                    as='select'
                                    name='cardExpiryMonth'
                                    className='form-select form-select-solid'
                                  >
                                    <option></option>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                    <option value='6'>6</option>
                                    <option value='7'>7</option>
                                    <option value='8'>8</option>
                                    <option value='9'>9</option>
                                    <option value='10'>10</option>
                                    <option value='11'>11</option>
                                    <option value='12'>12</option>
                                  </Field>
                                  <div className='text-danger'>
                                    <ErrorMessage name='cardExpiryMonth' />
                                  </div>
                                </div>

                                <div className='col-6'>
                                  <Field
                                    as='select'
                                    name='cardExpiryYear'
                                    className='form-select form-select-solid'
                                  >
                                    <option></option>
                                    <option value='2021'>2021</option>
                                    <option value='2022'>2022</option>
                                    <option value='2023'>2023</option>
                                    <option value='2024'>2024</option>
                                    <option value='2025'>2025</option>
                                    <option value='2026'>2026</option>
                                    <option value='2027'>2027</option>
                                    <option value='2028'>2028</option>
                                    <option value='2029'>2029</option>
                                    <option value='2030'>2030</option>
                                    <option value='2031'>2031</option>
                                  </Field>
                                  <div className='text-danger'>
                                    <ErrorMessage name='cardExpiryYear' />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='col-md-4 fv-row'>
                              <label className='d-flex align-items-center fs-6 fw-bold form-label mb-2'>
                                <span className='required'>CVV</span>
                                <i
                                  className='fas fa-exclamation-circle ms-2 fs-7'
                                  data-bs-toggle='tooltip'
                                  title='Enter a card CVV code'
                                ></i>
                              </label>

                              <div className='position-relative'>
                                <Field
                                  type='text'
                                  className='form-control form-control-solid'
                                  placeholder='CVV'
                                  name='cardCvv'
                                />
                                <div className='text-danger'>
                                  <ErrorMessage name='cardCvv' />
                                </div>

                                <div className='position-absolute translate-middle-y top-50 end-0 me-3'>
                                  <KTSVG
                                    path='/media/icons/duotune/finance/fin002.svg'
                                    className='svg-icon-2hx'
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='d-flex flex-stack'>
                            <div className='me-5'>
                              <label className='fs-6 fw-bold form-label'>
                                Save Card for further billing?
                              </label>
                              <div className='fs-7 fw-bold text-gray-400'>
                                If you need more info, please check budget planning
                              </div>
                            </div>

                            <label className='form-check form-switch form-check-custom form-check-solid'>
                              <Field className='form-check-input' type='checkbox' />
                              <span className='form-check-label fw-bold text-gray-400'>
                                Save Card
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div data-kt-stepper-element='content'>
                        <div className='w-100 text-center'>
                          <h1 className='fw-bolder text-dark mb-3'>Release!</h1>

                          <div className='text-muted fw-bold fs-3'>
                            Submit your app to kickstart your project.
                          </div>

                          <div className='text-center px-4 py-15'>
                            <img
                              src={toAbsoluteUrl('/media/illustrations/sketchy-1/9.png')}
                              alt=''
                              className='w-100 mh-300px'
                            />
                          </div>
                        </div>
                      </div>

                      <div className='d-flex flex-stack pt-10'>
                        <div className='me-2'>
                          <button
                            onClick={prevStep}
                            type='button'
                            className='btn btn-lg btn-light-primary me-3'
                            data-kt-stepper-action='previous'
                          >
                            <KTSVG
                              path='/media/icons/duotune/arrows/arr063.svg'
                              className='svg-icon-4 me-1'
                            />
                            Back
                          </button>
                        </div>

                        <div>
                          <button type='submit' className='btn btn-lg btn-primary me-3'>
                            <span className='indicator-label'>
                              {stepper.current?.currentStepIndex !==
                                stepper.current?.totatStepsNumber! - 1 && 'Continue'}
                              {stepper.current?.currentStepIndex ===
                                stepper.current?.totatStepsNumber! - 1 && 'Submit'}
                              <KTSVG
                                path='/media/icons/duotune/arrows/arr064.svg'
                                className='svg-icon-3 ms-2 me-0'
                              />
                            </span>
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Main }
