import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {initialQuotations, Quotations} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/QuotationsListLoading'
import {createUser, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {UserEditModalHeader} from './QuotationsEditModalHeader'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
  isUserLoading: boolean
  quotations: Quotations
}

const editUserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  first_name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
  last_name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
})

const UserEditModalForm: FC<Props> = ({quotations, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userForEdit] = useState<Quotations>({
    ...quotations,
    company: quotations.company || initialQuotations.company,
    type: quotations.type || initialQuotations.type,
    name: quotations.name || initialQuotations.name,
    invoiceNo: quotations.invoiceNo || initialQuotations.invoiceNo,
    address: quotations.address || initialQuotations.address,
    quotations: quotations.quotations || initialQuotations.quotations,
    balancePaid: quotations.balancePaid || initialQuotations.balancePaid,
    nextPaymentDate: quotations.nextPaymentDate || initialQuotations.nextPaymentDate,
    finalPaymentDate: quotations.finalPaymentDate || initialQuotations.finalPaymentDate,
    paymentTerm: quotations.paymentTerm || initialQuotations.paymentTerm,
    projectSchedule: quotations.projectSchedule || initialQuotations.projectSchedule,
    note: quotations.note || initialQuotations.note,
    poc: quotations.poc || initialQuotations.poc,
    contact: quotations.quotations || initialQuotations.contact,
    isFinished: quotations.isFinished || initialQuotations.isFinished,
    workType: quotations.workType || initialQuotations.workType,

  })

  // const [file, setFile] = useState<File>()
  // const [picture, setPicture] = useState<String>(`/media/${userForEdit.avatar}`)

  // const onChangePicture = (e: any) => {
  //   setPicture(URL.createObjectURL(e.target.files[0]))
  //   setFile(e.target.files?.[0])
  // }

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const notifyUserExist = () => toast('User already exists!')

  const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')

  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        // if (file !== undefined) {
        //   let fd = new FormData()
        //   fd.append('avatar', file)
        //   values.avatar = `profile/${await uploadImage(fd)}`
        // }

        if (isNotEmpty(values.id)) {
          await updateUser(values)
        } else {
          await createUser(values)
        }
        cancel(true)
      } catch (ex) {
        notifyUserExist()
        console.error(ex)
      } finally {
        setSubmitting(true)
        // cancel(true)
      }
    },
  })

  return (
    <>
      <ToastContainer position='bottom-center' />
      <UserEditModalHeader checkUser={quotations.id} /> 

      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}

        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_user_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_user_header'
          data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
          data-kt-scroll-offset='300px'
        >
          {/* begin::Input group */}
          <div className='d-flex align-items-center flex-column fv-row mb-10'>
            {/* begin::Label */}
            <label className='d-block fw-bold fs-6 mb-5'>Avatar</label>
            {/* end::Label */}
            {/* begin::Image input */}
            <div
              className='image-input image-input-outline'
              data-kt-image-input='true'
              style={{backgroundImage: `url('${blankImg}')`}}
            >
              {/* begin::Preview existing avatar */}
              {/* <div
                className='image-input-wrapper w-125px h-125px'
                style={{backgroundImage: `url('${picture}')`}}
              ></div> */}
              {/* end::Preview existing avatar */}

              {/* begin::Label */}
              <label
                className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                data-kt-image-input-action='change'
                data-bs-toggle='tooltip'
                title='Change avatar'
              >
                <i className='bi bi-pencil-fill fs-7'></i>

                {/* <input
                  type='file'
                  name='avatar'
                  accept='.png, .jpg, .jpeg'
                  onChange={(e) => {
                    onChangePicture(e)
                  }}
                />
                <input type='hidden' name='avatar_remove' /> */}
              </label>
              {/* end::Label */}

              {/* begin::Cancel */}
              <span
                className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                data-kt-image-input-action='cancel'
                data-bs-toggle='tooltip'
                title='Cancel avatar'
              >
                <i className='bi bi-x fs-2'></i>
              </span>
              {/* end::Cancel */}

              {/* begin::Remove */}
              {/* <span
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='remove'
              data-bs-toggle='tooltip'
              title='Remove avatar'
            >
              <i className='bi bi-x fs-2'></i>
            </span> */}
              {/* end::Remove */}
            </div>
            {/* end::Image input */}
            {/* begin::Hint */}
            <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
            {/* end::Hint */}
          </div>
          {/* end::Input group */}

          {/* begin::Form group ProjectName */}
          <div className='row fv-row mb-7'>
            <div className='col-xl-6'>
              <label className='form-label fw-bolder text-dark fs-6'>Project name</label>
              <input
                placeholder='Project Name'
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('name')}
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {
                    'is-invalid': formik.touched.name && formik.errors.name,
                  },
                  {
                    'is-valid': formik.touched.name && !formik.errors.name,
                  }
                )}
              />
              {formik.touched.name && formik.errors.name && (
                <div className='fv-plugins-message-container'>
                  <div className='mt-2 fv-help-block'>
                    <span role='alert' style={{color: '#f1416c'}}>
                      {formik.errors.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className='col-xl-6'>
              {/* begin::Form group Lastname */}
              <div className='fv-row mb-5'>
                <label className='form-label fw-bolder text-dark fs-6'>Work type</label>
                <input
                  placeholder='Work type'
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('workType')}
                  className={clsx(
                    'form-control form-control-lg form-control-solid',
                    {
                      'is-invalid': formik.touched.workType && formik.errors.workType,
                    },
                    {
                      'is-valid': formik.touched.workType && !formik.errors.workType,
                    }
                  )}
                />
                {formik.touched.workType && formik.errors.workType && (
                  <div className='fv-plugins-message-container'>
                    <div className='mt-2 fv-help-block'>
                      <span role='alert' style={{color: '#f1416c'}}>
                        {formik.errors.workType}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              {/* end::Form group */}
            </div>
          </div>
          {/* end::Form group */}

          {/* begin::Form group Email */}
          <div className='fv-row mb-7'>
            <label className='form-label fw-bolder text-dark fs-6'>Invoice Number</label>
            <input
              placeholder='Invoice Number'
              type='invoiceNo'
              autoComplete='off'
              {...formik.getFieldProps('invoiceNo')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {'is-invalid': formik.touched.invoiceNo && formik.errors.invoiceNo},
                {
                  'is-valid': formik.touched.invoiceNo && !formik.errors.invoiceNo,
                }
              )}
            />
            {formik.touched.invoiceNo && formik.errors.invoiceNo && (
              <div className='fv-plugins-message-container'>
                <div className='mt-2 fv-help-block'>
                  <span role='alert' style={{color: '#f1416c'}}>
                    {formik.errors.invoiceNo}
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}

          {/* begin::Input group */}
          <div className='mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-5'>workType</label>
            {/* end::Label */}
            {/* begin::Roles */}
            {/* begin::Input row */}
            <div className='d-flex fv-row'>
              {/* begin::Radio */}
              <div className='form-check form-check-custom form-check-solid'>
                {/* begin::Input */}
                <input
                  className='form-check-input me-3'
                  {...formik.getFieldProps('workType')}
                  name='workType'
                  type='radio'
                  value='Analyst'
                  id='kt_modal_update_role_option_0'
                  checked={formik.values.workType === 'Analyst'}
                  disabled={formik.isSubmitting || isUserLoading}
                />

                {/* end::Input */}
                {/* begin::Label */}
                <label className='form-check-label' htmlFor='kt_modal_update_role_option_0'>
                  <div className='fw-bolder text-gray-800'>Analyst</div>
                  <div className='text-gray-600'>Analyst of the company</div>
                </label>
                {/* end::Label */}
              </div>
              {/* end::Radio */}
            </div>
            {/* end::Input row */}
            {/* <div className='separator separator-dashed my-5'></div> */}
            {/* begin::Input row */}
            {/* <div className='d-flex fv-row'>
              <div className='form-check form-check-custom form-check-solid'>
                <input
                  className='form-check-input me-3'
                  {...formik.getFieldProps('role')}
                  name='role'
                  type='radio'
                  value='Developer'
                  id='kt_modal_update_role_option_1'
                  checked={formik.values.role === 'Developer'}
                  disabled={formik.isSubmitting || isUserLoading}
                />
                <label className='form-check-label' htmlFor='kt_modal_update_role_option_1'>
                  <div className='fw-bolder text-gray-800'>Developer</div>
                  <div className='text-gray-600'>
                    Best for developers or people primarily using the API
                  </div>
                </label>
              </div>
            </div> */}
            {/* end::Input row */}
            {/* <div className='separator separator-dashed my-5'></div> */}
            {/* begin::Input row */}
            {/* <div className='d-flex fv-row'>
              <div className='form-check form-check-custom form-check-solid'>
                <input
                  className='form-check-input me-3'
                  {...formik.getFieldProps('role')}
                  name='role'
                  type='radio'
                  value='Analyst'
                  id='kt_modal_update_role_option_2'
                  checked={formik.values.role === 'Analyst'}
                  disabled={formik.isSubmitting || isUserLoading}
                />
                <label className='form-check-label' htmlFor='kt_modal_update_role_option_2'>
                  <div className='fw-bolder text-gray-800'>Analyst</div>
                  <div className='text-gray-600'>
                    Best for people who need full access to analytics data, but don't need to update
                    business settings
                  </div>
                </label>
              </div>
            </div> */}
            {/* end::Input row */}
            <div className='separator separator-dashed my-5'></div>
            {/* begin::Input row */}
            <div className='d-flex fv-row'>
              <div className='form-check form-check-custom form-check-solid'>
                <input
                  className='form-check-input me-3'
                  {...formik.getFieldProps('workType')}
                  name='workType'
                  type='radio'
                  value='Support'
                  id='kt_modal_update_role_option_3'
                  checked={formik.values.workType === 'Support'}
                  disabled={formik.isSubmitting || isUserLoading}
                />
                <label className='form-check-label' htmlFor='kt_modal_update_role_option_3'>
                  <div className='fw-bolder text-gray-800'>Support</div>
                  <div className='text-gray-600'>Regular employees that are</div>
                </label>
              </div>
            </div>
            {/* end::Input row */}
            {/* <div className='separator separator-dashed my-5'></div> */}
            {/* begin::Input row */}
            {/* <div className='d-flex fv-row'>
              <div className='form-check form-check-custom form-check-solid'>
                <input
                  className='form-check-input me-3'
                  {...formik.getFieldProps('role')}
                  name='role'
                  type='radio'
                  id='kt_modal_update_role_option_4'
                  value='Trial'
                  checked={formik.values.role === 'Trial'}
                  disabled={formik.isSubmitting || isUserLoading}
                />
                <label className='form-check-label' htmlFor='kt_modal_update_role_option_4'>
                  <div className='fw-bolder text-gray-800'>Trial</div>
                  <div className='text-gray-600'>
                    Best for people who need to preview content data, but don't need to make any
                    updates
                  </div>
                </label>
              </div>
            </div> */}
            {/* end::Input row */}
            {/* end::Roles */}
          </div>
          {/* end::Input group */}
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Discard
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Submit</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  )
}

export {UserEditModalForm}
