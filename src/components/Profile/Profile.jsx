import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert
} from '@mui/material';
import {
  Person,
  Email,
  CalendarToday,
  Security,
  Edit,
  Star,
  History
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../Layout/Layout';

const Profile = () => {
  const { user, logout } = useAuth();

  const formatDate = (dateString) => {
    if (!dateString) return 'Não disponível';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Função para obter iniciais do nome
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Estatísticas fictícias (você pode conectar com dados reais depois)
  const userStats = {
    charactersViewed: 47,
    favoriteCharacter: "Luke Skywalker",
    joinedDays: Math.floor((new Date() - new Date(user?.created_at)) / (1000 * 60 * 60 * 24)) || 15,
    achievements: 3
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, minHeight: '80vh' }}>
      {/* Header do Perfil */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          background: 'linear-gradient(135deg, #1f1e1e 0%, #2d2d2d 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)',
            opacity: 0.1
          }}
        />
        
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: '#FFD700',
                color: '#1f1e1e',
                fontSize: '2.5rem',
                fontWeight: 'bold',
                border: '4px solid rgba(255,255,255,0.2)'
              }}
            >
              {getInitials(user?.name)}
            </Avatar>
          </Grid>
          
          <Grid item xs={12} md={9}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {user?.name}
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
              {user?.email}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip 
                icon={<Star sx={{ color: '#FFD700' }} />} 
                label="Usuário Premium" 
                variant="outlined" 
                sx={{ color: 'white', borderColor: '#FFD700' }}
              />
              <Chip 
                icon={<Security />} 
                label="Conta Verificada" 
                variant="outlined" 
                sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        {/* Coluna da Esquerda - Informações Pessoais */}
        <Grid item xs={12} md={8}>
          {/* Card de Informações da Conta */}
          <Card elevation={2} sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person color="primary" />
                Informações da Conta
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Person color="action" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Nome completo" 
                    secondary={user?.name || 'Não informado'}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Email color="action" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Email" 
                    secondary={user?.email}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <CalendarToday color="action" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Membro desde" 
                    secondary={formatDate(user?.created_at)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <Security color="action" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Status da conta" 
                    secondary="Verificada"
                    secondaryTypographyProps={{ color: 'success.main' }}
                  />
                </ListItem>
              </List>
              
              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button 
                  variant="outlined" 
                  startIcon={<Edit />}
                  onClick={() => alert('Funcionalidade em desenvolvimento!')}
                >
                  Editar Perfil
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary"
                  onClick={() => alert('Funcionalidade em desenvolvimento!')}
                >
                  Alterar Senha
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Card de Atividades Recentes */}
          <Card elevation={2}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <History color="primary" />
                Atividades Recentes
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Alert severity="info" sx={{ mb: 2 }}>
                Em breve: histórico completo das suas atividades na plataforma
              </Alert>
              
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Login realizado" 
                    secondary={`Hoje às ${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Character visualizado" 
                    secondary="Luke Skywalker - Ontem"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Busca realizada" 
                    secondary='"Jedi" - 2 dias atrás'
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Coluna da Direita - Estatísticas e Ações */}
        <Grid item xs={12} md={4}>
          {/* Card de Estatísticas */}
          <Card elevation={2} sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Star color="primary" />
                Suas Estatísticas
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" color="primary" gutterBottom>
                  {userStats.charactersViewed}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Characters visualizados
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="secondary">
                      {userStats.achievements}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Conquistas
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" color="success.main">
                      {userStats.joinedDays}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Dias como membro
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Card de Ações Rápidas */}
          <Card elevation={2}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Ações Rápidas
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={() => window.location.href = '/characters'}
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Explorar Characters
                </Button>
                
                <Button 
                  variant="outlined" 
                  fullWidth
                  onClick={() => alert('Em desenvolvimento!')}
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Meus Favoritos
                </Button>
                
                <Button 
                  variant="outlined" 
                  fullWidth
                  onClick={() => alert('Em desenvolvimento!')}
                  sx={{ justifyContent: 'flex-start' }}
                >
                  Configurações
                </Button>
                
                <Button 
                  variant="outlined" 
                  color="error"
                  fullWidth
                  onClick={logout}
                  sx={{ justifyContent: 'flex-start', mt: 1 }}
                >
                  Sair da Conta
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;