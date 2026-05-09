import React, { useState } from 'react';
import {
    Box,
    Typography,
    Slider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
    Button,
    IconButton,
    ToggleButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckIcon from '@mui/icons-material/Check';
import TuneIcon from '@mui/icons-material/Tune';
import './Filters.scss';

const Filters = ({ onClose }) => {
    const [priceRange, setPriceRange] = useState([50, 200]);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState('Large');

    const colors = [
        '#00C129', '#F50606', '#F5DD06', '#F57906', '#06CAF5',
        '#063AF5', '#7D06F5', '#F506A4', '#FFFFFF', '#000000'
    ];

    const sizes = [
        'XX-Small', 'X-Small', 'Small', 'Medium',
        'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'
    ];

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    return (
        <Box className="filters">
            <Box className="filters__container">
                <Box className="filters__header">
                    <Typography variant="h3" className="filters__title">Filters</Typography>
                    <IconButton className="filters__close-btn" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                    <TuneIcon className="filters__icon-desktop" />
                </Box>

                <Divider className="filters__divider" />

                <Box className="filters__section">
                    {['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'].map((item) => (
                        <Box key={item} className="filters__category-item">
                            <Typography>{item}</Typography>
                            <ChevronRightIcon />
                        </Box>
                    ))}
                </Box>

                <Divider className="filters__divider" />

                <Accordion defaultExpanded className="filters__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className="filters__accordion-title">Price</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Slider
                            value={priceRange}
                            onChange={handlePriceChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={500}
                            className="filters__price-slider"
                        />
                        <Box className="filters__price-labels">
                            <Typography>${priceRange[0]}</Typography>
                            <Typography>${priceRange[1]}</Typography>
                        </Box>
                    </AccordionDetails>
                </Accordion>

                <Divider className="filters__divider" />

                <Accordion defaultExpanded className="filters__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className="filters__accordion-title">Colors</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box className="filters__colors-grid">
                            {colors.map((color) => (
                                <Box
                                    key={color}
                                    className={`filters__color-circle ${selectedColor === color ? 'filters__color-circle--active' : ''}`}
                                    style={{ backgroundColor: color, border: color === '#FFFFFF' ? '1px solid #e1e1e1' : 'none' }}
                                    onClick={() => setSelectedColor(color)}
                                >
                                    {selectedColor === color && (
                                        <CheckIcon style={{ color: color === '#FFFFFF' ? '#000' : '#fff', fontSize: '16px' }} />
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </AccordionDetails>
                </Accordion>

                <Divider className="filters__divider" />

                {/* Sizes */}
                <Accordion defaultExpanded className="filters__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className="filters__accordion-title">Size</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box className="filters__sizes-wrap">
                            {sizes.map((size) => (
                                <ToggleButton
                                    key={size}
                                    value={size}
                                    selected={selectedSize === size}
                                    onChange={() => setSelectedSize(size)}
                                    className="filters__size-btn"
                                >
                                    {size}
                                </ToggleButton>
                            ))}
                        </Box>
                    </AccordionDetails>
                </Accordion>

                <Divider className="filters__divider" />

                {/* Dress Style */}
                <Accordion defaultExpanded className="filters__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className="filters__accordion-title">Dress Style</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {['Casual', 'Formal', 'Party', 'Gym'].map((style) => (
                            <Box key={style} className="filters__category-item">
                                <Typography>{style}</Typography>
                                <ChevronRightIcon />
                            </Box>
                        ))}
                    </AccordionDetails>
                </Accordion>

                <Button variant="contained" className="filters__apply-btn" fullWidth>
                    Apply Filter
                </Button>
            </Box>
        </Box>
    );
};

export default Filters;