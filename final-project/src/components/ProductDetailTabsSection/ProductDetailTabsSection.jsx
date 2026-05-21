import { useState } from 'react';
import { useParams } from 'react-router';
import {
    Box, Typography, Skeleton,
    Tabs, Tab, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReviewCard from '../ReviewCard/ReviewCard.jsx';
import { useGetProductByIdQuery } from "../../store/api/productsApi.js";
import './ProductDetailTabsSection.scss';
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";

const ProductDetailTabsSection = () => {
    const { id } = useParams();

    const [activeTab, setActiveTab] = useState(1);

    const { data: productData, isLoading: isProductLoading, isError: isProductError, error } = useGetProductByIdQuery(id);

    const reviews = productData?.reviews || [];

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    if (isProductError) {
        return (
            <Box component="section" className="product-reviews">
                <ErrorMessage error={error?.message || error?.data?.message || "Error reviews and details loading"} />
            </Box>
        );
    }

    return (
            <Box component="section" className="product-reviews">

                <Box className="product-reviews__tabs-container">
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        centered
                        variant="fullWidth"
                        className="product-reviews__tabs"
                    >
                        <Tab label="Product Details" className="product-reviews__tab" />
                        <Tab label="Rating & Reviews" className="product-reviews__tab" />
                        <Tab label="FAQs" className="product-reviews__tab" />
                    </Tabs>
                </Box>

                {activeTab === 0 && (
                    <Box className="product-reviews__content-panel">
                        <Typography variant="h5" className="product-reviews__panel-title">
                            Technical Specifications
                        </Typography>
                        {isProductLoading ? (
                            <Box className="product-reviews__specs-list" sx={{ width: '100%' }}>
                                {[...Array(5)].map((_, i) => (
                                    <Box key={i} className="product-reviews__spec-item">
                                        <Skeleton variant="text" animation="wave" sx={{ width: '100px', height: '24px' }} />
                                        <Skeleton variant="text" animation="wave" sx={{ width: '140px', height: '24px' }} />
                                    </Box>
                                ))}
                            </Box>
                        ) : productData ? (
                            <Box className="product-reviews__specs-list">
                                <Box className="product-reviews__spec-item">
                                    <Typography className="product-reviews__spec-label">Brand:</Typography>
                                    <Typography className="product-reviews__spec-value">{productData.brand || 'N/A'}</Typography>
                                </Box>
                                <Box className="product-reviews__spec-item">
                                    <Typography className="product-reviews__spec-label">Weight:</Typography>
                                    <Typography className="product-reviews__spec-value">{productData.weight} kg</Typography>
                                </Box>
                                <Box className="product-reviews__spec-item">
                                    <Typography className="product-reviews__spec-label">Dimensions:</Typography>
                                    <Typography className="product-reviews__spec-value">
                                        {productData.dimensions?.width} x {productData.dimensions?.height} x {productData.dimensions?.depth} cm (W x H x D)
                                    </Typography>
                                </Box>
                                <Box className="product-reviews__spec-item">
                                    <Typography className="product-reviews__spec-label">Rating:</Typography>
                                    <Typography className="product-reviews__spec-value">{productData.rating} / 5</Typography>
                                </Box>
                                <Box className="product-reviews__spec-item">
                                    <Typography className="product-reviews__spec-label">Warranty:</Typography>
                                    <Typography className="product-reviews__spec-value">{productData.warrantyInformation}</Typography>
                                </Box>
                            </Box>
                        ) : (
                            <Typography>No details available for this product.</Typography>
                        )}
                    </Box>
                )}

                {activeTab === 1 && (
                    <Box className="product-reviews__content-panel">
                        <Box className="product-reviews__header">
                            <Typography variant="h4" className="product-reviews__title">
                                All Reviews <span className="product-reviews__count">
                                    {isProductLoading ? (
                                        <Skeleton variant="text" animation="wave" sx={{ width: '30px', height: '24px', display: 'inline-block', verticalAlign: 'middle' }} />
                                    ) : `(${reviews.length})`}
                                </span>
                            </Typography>
                        </Box>

                        <Box className="product-reviews__grid">
                            {isProductLoading ? (
                                [...Array(4)].map((_, i) => (
                                    <Skeleton
                                        key={i}
                                        variant="rectangular"
                                        animation="wave"
                                        sx={{ width: '100%', height: '240px', borderRadius: '20px' }}
                                    />
                                ))
                            ) : (
                                reviews.map((review, index) => (
                                    <ReviewCard key={review.id || index} review={review} />
                                ))
                            )}
                        </Box>

                    </Box>
                )}

                {activeTab === 2 && (
                    <Box className="product-reviews__content-panel">
                        <Typography variant="h5" className="product-reviews__panel-title">
                            Frequently Asked Questions
                        </Typography>

                        <Accordion disableGutters elevation={0} className="product-reviews__accordion">
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className="product-reviews__faq-question">What is the return policy for this shop?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className="product-reviews__faq-answer">
                                    We offer a 30-day return policy for all unused items in their original packaging. Please check our global Return Policy page for step-by-step instructions.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion disableGutters elevation={0} className="product-reviews__accordion">
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className="product-reviews__faq-question">How long does shipping usually take?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className="product-reviews__faq-answer">
                                    Standard shipping typically takes 3 to 7 business days, depending on your location. Detailed shipping options and tracking numbers are provided upon checkout.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion disableGutters elevation={0} className="product-reviews__accordion">
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className="product-reviews__faq-question">Are the products authentic and original?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className="product-reviews__faq-answer">
                                    Absolutely! SHOP.CO only partners directly with authorized brands and verified distributors to ensure 100% authenticity for all items listed.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                )}

            </Box>
    );
};

export default ProductDetailTabsSection;