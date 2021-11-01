import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from '../shared/Footer.styled'
import { getCountryName, getParseHtmlArticle } from 'utils/helpers'
import SenderDetails from 'components/transactionDetails/transactionHistory/senderDetails'
import BorderTitle from 'components/shared/BorderTitle.styled';

const Success = () => {
    const postDeliveryDetails = useSelector((state) => state.receiver.postDeliveryData)
    const countries = useSelector((state) => state.receiver.countries)

    const payoutLocationText = () => {
        if (postDeliveryDetails?.receiver?.address.country_iso_code !== 'US') {
            if (postDeliveryDetails?.paymentDetails?.fix_on_send === 'N') {
                return 'Expected Foreign Country Payout Location'
            } else {
                return 'Foreign Country Payout Location'
            }
        } else if (postDeliveryDetails?.paymentDetails?.fix_on_send === 'N') {
            return 'Expected Payout Location'
        } else {
            return 'Payout Location'
        }
    }

    return (
        <Card>
            <div>
                <h3>Success</h3>
                {getParseHtmlArticle('en_wu_130')}
                <BorderTitle smallText className="mt-4">Tracking Information</BorderTitle>
                <div className="d-flex justify-content-between info">
                    <p>Tracking Number</p>
                    <span><b>##########</b></span>
                </div>
                <span>{getParseHtmlArticle('en_wu_134')}</span>

                <BorderTitle smallText className="mt-4">Transaction Details</BorderTitle>
                <div className="d-flex justify-content-between info">
                    <p>Date of transaction</p>
                    <span><b>-----</b>
                    </span>
                </div>

                <div className="d-flex justify-content-between info">
                    <p>Time of transaction</p>
                    <span><b>-----</b>
                    </span>
                </div>

                <div className="d-flex justify-content-between info">
                    <p>My WU number</p>
                    <span><b>-----</b>
                    </span>
                </div>

                <div className="d-flex justify-content-between info">
                    <p>Total points</p>
                    <span><b>-----</b>
                    </span>
                </div>

                {postDeliveryDetails?.sender && <SenderDetails sender={ postDeliveryDetails?.sender } />}

                <BorderTitle smallText className="mt-4">Final Receiver</BorderTitle>
                <div className="d-flex justify-content-between info">
                    <p>Name</p>
                    <span><b> {postDeliveryDetails?.receiver?.name?.first_name || ''} {postDeliveryDetails?.receiver?.name?.middle_name || ''} {postDeliveryDetails?.receiver?.name.last_name || ''}</b>
                    </span>
                </div>

                <div className="d-flex justify-content-between info">
                    <p>{payoutLocationText()}</p>
                    <span><b>{getCountryName(countries, postDeliveryDetails?.receiver?.address.country_iso_code)}</b>
                    </span>
                </div>
                {postDeliveryDetails?.receiver?.address.city &&
                    <div className="d-flex justify-content-between info">
                        <p>Payout City</p>
                        <span><b>{postDeliveryDetails?.receiver?.address.city}</b>
                        </span>
                    </div>
                }
                {postDeliveryDetails?.receiver?.address.state &&
                <div className="d-flex justify-content-between info">
                    <p>Payout State</p>
                    <span><b>{postDeliveryDetails?.receiver?.address.state}</b>
                    </span>
                </div>}
                <div className="d-flex justify-content-between info">
                    <p>Exchange Rate </p>
                    <span>------</span>
                </div>
                <div className="d-flex justify-content-between info">
                    <p>Transfer amount</p>
                    <span>-------</span>
                </div>
                <div className="d-flex justify-content-between info-heading mt-3">
                    <h4 >Total to Final Receiver </h4>
                    <span>-------</span>
                </div>
                <div className="d-flex justify-content-between info-heading">
                    <h4>Total</h4>
                    <span>-------</span>
                </div>
                {getParseHtmlArticle('en_wu_117')}
                {getParseHtmlArticle('en_wu_127')}
                {getParseHtmlArticle('en_wu_121')}
                {getParseHtmlArticle('en_wu_115')}
                {getParseHtmlArticle('en_wu_122')}
                {postDeliveryDetails?.sender?.address?.state === 'CA' && getParseHtmlArticle('en_wu_104')}
                {postDeliveryDetails?.receiver?.address?.country_iso_code==='US' &&
                postDeliveryDetails?.sender.address.state ==='TX' &&
                getParseHtmlArticle('en_wu_105')
                }
                {getParseHtmlArticle('en_wu_109')}
                {getParseHtmlArticle('en_wu_110')}
                {getParseHtmlArticle('en_wu_111')}
            </div>
        </Card>
    )
}

export default Success