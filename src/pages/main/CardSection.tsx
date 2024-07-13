import styled from '@emotion/styled';
import { Box, Grid, Pagination, Stack } from '@mui/material';
import InfoCard from 'component/card/InfoCard';
import { SetStateAction, useState } from 'react';
import claycat from '../../assets/image/claycat.jpg';

const itemsPerPage = 5;
const items = [
    { title: 'React', imageUrl: claycat, likes: 122, shares: 132, views: 100 },
    { title: 'React', imageUrl: claycat, likes: 122, shares: 132, views: 100 },
    { title: 'React', imageUrl: claycat, likes: 122, shares: 132, views: 100 },
    { title: 'React', imageUrl: claycat, likes: 122, shares: 132, views: 100 },
    { title: 'React', imageUrl: claycat, likes: 122, shares: 132, views: 100 },
];
const CardContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: '10%',
});

const CardSection = () => {
    const [page, setPage] = useState(1);
    const count = Math.ceil(items.length / itemsPerPage);

    const handleChange = (event: any, value: SetStateAction<number>) => {
        setPage(value);
    };

    const currentPageData = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <CardContainer>
            <Grid
                container
                spacing={2}
                justifyContent="center"
                sx={{ px: { xs: 1, sm: 2, md: 3 } }}
            >
                {currentPageData.map((item, index) => (
                    <Grid item xs={12} sm={6} md={2.4} key={index}>
                        <InfoCard {...item} />
                    </Grid>
                ))}
            </Grid>
            <Stack spacing={2} alignItems="center" sx={{ marginTop: 4 }}>
                <Pagination count={count} page={page} onChange={handleChange} color="primary" />
            </Stack>
        </CardContainer>
    );
};

export default CardSection;
