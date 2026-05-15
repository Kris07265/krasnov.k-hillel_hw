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
import TuneIcon from '@mui/icons-material/Tune';
import './Filters.scss';

const Filters = ({ onClose, filters, onFilterChange, onApply }) => {

    const handleChange = (field) => (event, newValue) => {
        onFilterChange({ ...filters, [field]: newValue });
    };

    const ratingOptions = [5, 4, 3, 2, 1];

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

                <Accordion defaultExpanded className="filters__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className="filters__accordion-title">Price</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Slider
                            value={filters.price}
                            onChange={handleChange('price')}
                            valueLabelDisplay="auto"
                            min={0}
                            max={20000}
                            className="filters__price-slider"
                        />
                        <Box className="filters__price-labels">
                            <Typography>${filters.price[0]}</Typography>
                            <Typography>${filters.price[1]}</Typography>
                        </Box>
                    </AccordionDetails>
                </Accordion>

                <Divider className="filters__divider" />

                <Accordion defaultExpanded className="filters__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className="filters__accordion-title">Rating</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box className="filters__sizes-wrap">
                            {ratingOptions.map((rate) => (
                                <ToggleButton
                                    key={rate}
                                    value={rate}
                                    selected={filters.rating === rate}
                                    onChange={() => onFilterChange({ ...filters, rating: rate })}
                                    className="filters__size-btn"
                                >
                                    {rate} Stars & Up
                                </ToggleButton>
                            ))}
                        </Box>
                    </AccordionDetails>
                </Accordion>

                <Divider className="filters__divider" />

                <Accordion defaultExpanded className="filters__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className="filters__accordion-title">Weight</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Slider
                            value={filters.weight}
                            onChange={handleChange('weight')}
                            valueLabelDisplay="auto"
                            min={0}
                            max={50}
                            className="filters__price-slider"
                        />
                        <Box className="filters__price-labels">
                            <Typography>{filters.weight[0]}kg</Typography>
                            <Typography>{filters.weight[1]}kg</Typography>
                        </Box>
                    </AccordionDetails>
                </Accordion>

                <Divider className="filters__divider" />

                <Accordion defaultExpanded className="filters__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className="filters__accordion-title">Dimensions</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2" sx={{ mb: 1 }}>Width</Typography>
                        <Slider
                            value={filters.width}
                            onChange={handleChange('width')}
                            min={0} max={100} size="small" className="filters__price-slider"
                        />

                        <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>Height</Typography>
                        <Slider
                            value={filters.height}
                            onChange={handleChange('height')}
                            min={0} max={100} size="small" className="filters__price-slider"
                        />

                        <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>Depth</Typography>
                        <Slider
                            value={filters.depth}
                            onChange={handleChange('depth')}
                            min={0} max={100} size="small" className="filters__price-slider"
                        />
                    </AccordionDetails>
                </Accordion>

                <Button
                    variant="contained"
                    className="filters__apply-btn"
                    fullWidth
                    onClick={onApply}
                >
                    Apply Filter
                </Button>
            </Box>
        </Box>
    );
};

export default Filters;