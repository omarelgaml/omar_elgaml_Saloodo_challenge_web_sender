/* eslint-disable react/prop-types */
import { Col, Typography, Divider } from "antd";

const { Title, Text } = Typography;

import { useDispatch, useSelector } from "react-redux";
import {
  deleteParcelThunk,
  getParcelsThunk,
} from "../../state/thunks/ParcelsThunk";
import { ParcelsLoadingSelector } from "../../state/Selectors";
import { DeleteButton, StyledCard, StyledRow, labelStyle } from "./styles";
const ParcelCard = ({ parcel, edit }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => ParcelsLoadingSelector(state));

  const {
    dropoffAddress,
    pickupAddress,
    biker,
    bikerNotes,
    senderNotes,
    createdAt,
    datePicked,
    dateDelivered,
    status,
    _id,
  } = parcel;
  const delelteClicked = async () => {
    await dispatch(deleteParcelThunk(_id));
    await dispatch(getParcelsThunk());
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    return formattedDate;
  };
  return (
    <>
      {parcel && (
        <StyledCard>
          <Title level={5}>Parcel Details</Title>

          <StyledRow gutter={[16, 16]}>
            <Col span={12}>
              <Text style={labelStyle}>Dropoff Address:</Text>
              <div>{`${dropoffAddress.country}, ${dropoffAddress.city}, ${dropoffAddress.street}, ${dropoffAddress.buildingNumber}, ${dropoffAddress.floor}`}</div>
            </Col>
            <Col span={12}>
              <Text style={labelStyle}>Pickup Address:</Text>
              <div>{`${pickupAddress.country}, ${pickupAddress.city}, ${pickupAddress.street}, ${pickupAddress.buildingNumber}, ${pickupAddress.floor}`}</div>
            </Col>
          </StyledRow>
          <Divider />
          <StyledRow gutter={[16, 16]}>
            <Col span={12}>
              <Text style={labelStyle}>Biker Name:</Text>
              <div>
                {biker
                  ? `${biker.firstName} ${biker.lastName}`
                  : "Not assigned"}
              </div>
            </Col>
            <Col span={12}>
              <Text style={labelStyle}>Biker Notes:</Text>
              <div>{bikerNotes ? bikerNotes : "--"}</div>
            </Col>
          </StyledRow>
          <Divider />
          <StyledRow gutter={[16, 16]}>
            <Col span={12}>
              <Text style={labelStyle}>Sender Notes:</Text>
              <div>{senderNotes}</div>
            </Col>
            <Col span={12}>
              <Text style={labelStyle}>Created At:</Text>
              <div>{formatDateTime(createdAt)}</div>
            </Col>
          </StyledRow>
          <Divider />
          <StyledRow gutter={[16, 16]}>
            <Col span={12}>
              <Text style={labelStyle}>Picked Date:</Text>
              <div>
                {datePicked ? formatDateTime(datePicked) : "Not picked yet"}
              </div>
            </Col>
            <Col span={12}>
              <Text style={labelStyle}>Delivered Date:</Text>
              <div>
                {dateDelivered
                  ? formatDateTime(dateDelivered)
                  : "Not delivered yet"}
              </div>
            </Col>
          </StyledRow>
          <Divider />
          <StyledRow gutter={[16, 16]}>
            <Col span={12}>
              <Text style={labelStyle}>Status:</Text>
              <div>{status.name}</div>
            </Col>
            <Col span={12}>
              <Text style={labelStyle}>Biker phone number:</Text>
              <div>{biker ? biker.phoneNumber : "--"}</div>
            </Col>
          </StyledRow>

          <Divider />
          <StyledRow gutter={[16, 16]}>
            <Col span={2} offset={20}>
              <DeleteButton
                onClick={() => edit(parcel)}
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Edit
              </DeleteButton>
            </Col>
            <Col span={2}>
              <DeleteButton
                onClick={() => delelteClicked()}
                type="primary"
                danger
                htmlType="submit"
                loading={loading}
              >
                Delete
              </DeleteButton>
            </Col>
          </StyledRow>
        </StyledCard>
      )}
    </>
  );
};

export default ParcelCard;
