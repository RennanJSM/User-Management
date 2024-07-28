import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { getUsers } from '../services/apiService';
import { Card, CardContent, Typography, Grid, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  birthdate: string;
  registerDate: string;
}

const Dashboard = () => {
  const [genderData, setGenderData] = useState<{ label: string, value: number }[]>([]);
  const [monthlyData, setMonthlyData] = useState<{ label: string, value: number }[]>([]);
  const [totalRegistrationsThisMonth, setTotalRegistrationsThisMonth] = useState(0);
  const [monthlyGenderData, setMonthlyGenderData] = useState<{ [key: string]: { label: string, value: number }[] }>({});
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // mês atual

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const data = await getUsers();
        const users = data;

        const currentMonth = selectedMonth;

        const usersThisMonth = users.filter((user: User) => new Date(user.registerDate).getMonth() === currentMonth);

        const genderCountsThisMonth = usersThisMonth.reduce((acc: { [key: string]: number }, user: User) => {
          acc[user.gender] = (acc[user.gender] || 0) + 1;
          return acc;
        }, {});

        const genderDataThisMonthFormatted = Object.keys(genderCountsThisMonth).map(gender => ({
          label: gender,
          value: genderCountsThisMonth[gender],
        }));

        setGenderData(genderDataThisMonthFormatted);

        const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

        const monthlyCounts = users.reduce((acc: { [key: string]: number }, user: User) => {
          const month = new Date(user.registerDate).getMonth();
          const monthName = monthNames[month];
          acc[monthName] = (acc[monthName] || 0) + 1;
          return acc;
        }, {});

        const monthlyDataFormatted = Object.keys(monthlyCounts).map(month => ({
          label: month,
          value: monthlyCounts[month],
        }));

        setMonthlyData(monthlyDataFormatted);

        setTotalRegistrationsThisMonth(usersThisMonth.length);

        const monthlyGenderCounts = users.reduce((acc: { [key: string]: { [key: string]: number } }, user: User) => {
          const month = new Date(user.registerDate).getMonth();
          const monthName = monthNames[month];
          if (!acc[monthName]) acc[monthName] = {};
          acc[monthName][user.gender] = (acc[monthName][user.gender] || 0) + 1;
          return acc;
        }, {});

        const monthlyGenderDataFormatted = Object.keys(monthlyGenderCounts).reduce((acc, month) => {
          acc[month] = Object.keys(monthlyGenderCounts[month]).map(gender => ({
            label: gender,
            value: monthlyGenderCounts[month][gender],
          }));
          return acc;
        }, {} as { [key: string]: { label: string, value: number }[] });

        setMonthlyGenderData(monthlyGenderDataFormatted);
      } catch (error) {
        console.error('Error fetching users data:', error);
        throw error;
      }
    };

    fetchUsersData();
  }, [selectedMonth]);

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setSelectedMonth(Number(event.target.value));
  };

  const getGenderColor = (label: string) => {
    switch (label) {
      case 'Masculino':
        return 'rgba(75, 192, 192, 1)';
      case 'Feminino':
        return 'rgba(255, 99, 132, 1)';
      case 'Outro':
        return 'rgba(255, 206, 86, 1)';
      default:
        return 'rgba(0, 0, 0, 0.1)';
    }
  };

  const genderChartData = {
    labels: genderData.map(data => data.label),
    datasets: [
      {
        label: 'Distribuição por Gênero neste Mês',
        data: genderData.map(data => data.value),
        backgroundColor: genderData.map(data => getGenderColor(data.label)),
        borderColor: genderData.map(data => getGenderColor(data.label)),
        borderWidth: 1,
      },
    ],
  };

  const monthlyChartData = {
    labels: monthlyData.map(data => data.label),
    datasets: [
      {
        label: 'Registros por Mês',
        data: monthlyData.map(data => data.value),
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  
  const sortedMonths = Object.keys(monthlyGenderData).sort((a, b) => {
    const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return monthNames.indexOf(a) - monthNames.indexOf(b);
  });

  return (
    <div>
      <h2 style={{marginTop: '1.8rem'}}>Filtro por Mês:</h2>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Mês</InputLabel>
            <Select value={selectedMonth} onChange={handleMonthChange} label="Mês">
              {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'].map((month, index) => (
                <MenuItem key={index} value={index}>{month}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Card style={{ backgroundColor: '#00acc1' }}>
            <CardContent style={{ color: 'white' }}>
              <Typography variant="h6" component="div">
                Total de Cadastros no Mês
              </Typography>
              <Typography variant="h4">{totalRegistrationsThisMonth}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {genderData.map(gender => (
          <Grid item key={gender.label}>
            <Card style={{ backgroundColor: '#00acc1' }}>
              <CardContent style={{ color: 'white' }}>
                <Typography variant="h6" component="div">
                  {`Cadastros ${gender.label} neste Mês`}
                </Typography>
                <Typography variant="h4">{gender.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div style={{ width: '26%', margin: '0 auto', paddingTop: '20px' }}>
        <h2>Distribuição por Gênero neste Mês</h2>
        <Pie data={genderChartData} />
      </div>

      <div style={{ width: '26%', margin: '0 auto', paddingTop: '20px' }}>
          <h1>Dados Gerais:</h1>
      </div>

      <div style={{ width: '26%', margin: '0 auto', paddingTop: '20px' }}>
        <h2>Registros por Mês</h2>
        <Bar data={monthlyChartData} />
      </div>

      {sortedMonths.map(month => (
        <Grid container spacing={2} justifyContent="center" key={month}>
          <Grid item style={{ width: '42rem', margin: '20px' }}>
            <h2>{`Registros em ${month}`}</h2>
            <Bar
              data={{
                labels: monthlyGenderData[month].map(data => data.label),
                datasets: [
                  {
                    label: '',
                    data: monthlyGenderData[month].map(data => data.value),
                    backgroundColor: monthlyGenderData[month].map(data => getGenderColor(data.label)),
                    borderColor: monthlyGenderData[month].map(data => getGenderColor(data.label)),
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false, 
                  },
                },
              }}
            />
          </Grid>
          <Grid item style={{ width: '18rem', margin: '20px' }}>
            <h2>{`Distribuição por Gênero em ${month}`}</h2>
            <Pie
              data={{
                labels: monthlyGenderData[month].map(data => data.label),
                datasets: [
                  {
                    label: 'Distribuição de Gênero',
                    data: monthlyGenderData[month].map(data => data.value),
                    backgroundColor: monthlyGenderData[month].map(data => getGenderColor(data.label)),
                    borderColor: monthlyGenderData[month].map(data => getGenderColor(data.label)),
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default Dashboard;
