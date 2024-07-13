import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Card, CardActions, CardMedia, IconButton, Typography, styled } from '@mui/material';

interface InfoCardProps {
    title: string;
    imageUrl: string;
    likes: number;
    shares: number;
    views: number;
}

const CardWrapper = styled('div')({
    position: 'relative',
    width: '100%',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
});

const StyledCard = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
});

const TitleBar = styled(Typography)({
    padding: '8px',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    textAlign: 'center',
});

const AspectRatioBox = styled('div')({
    position: 'relative',
    width: '100%',
    paddingTop: '70%',
    '& img': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 'calc(100% - 16px)',
        height: 'calc(100% - 16px)',
        objectFit: 'cover',
        margin: '0 8px 0 8px',
    },
});

const Separator = styled('div')({
    width: '80%',
    height: '2px',
    backgroundColor: '#e0e0e0',
    alignSelf: 'center',
});

const StyledCardActions = styled(CardActions)({
    justifyContent: 'flex-end',
    padding: '4px 16px 6px 7px',
    flexWrap: 'wrap',
});

const StyledIconButton = styled(IconButton)({
    padding: '4px',
    '&:last-child': {
        paddingRight: '12px',
    },
    '&.Mui-disabled': {
        color: '#808080',
    },
});

const StyledTypography = styled(Typography)({
    fontSize: '0.7rem',
    marginLeft: '2px',
});

const InfoCard: React.FC<InfoCardProps> = ({ title, imageUrl, likes, shares, views }) => {
    return (
        <CardWrapper>
            <StyledCard>
                <TitleBar>{title}</TitleBar>
                <AspectRatioBox>
                    <CardMedia component="img" image={imageUrl} alt={title} />
                </AspectRatioBox>
                <Separator />
                <StyledCardActions disableSpacing>
                    <StyledIconButton aria-label="add to favorites" disabled size="small">
                        <FavoriteIcon fontSize="small" />
                        <StyledTypography variant="caption">{likes}</StyledTypography>
                    </StyledIconButton>
                    <StyledIconButton aria-label="share" disabled size="small">
                        <ShareIcon fontSize="small" />
                        <StyledTypography variant="caption">{shares}</StyledTypography>
                    </StyledIconButton>
                    <StyledIconButton aria-label="view count" disabled size="small">
                        <VisibilityIcon fontSize="small" />
                        <StyledTypography variant="caption">{views}</StyledTypography>
                    </StyledIconButton>
                </StyledCardActions>
            </StyledCard>
        </CardWrapper>
    );
};

export default InfoCard;
