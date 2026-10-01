import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import { useToast } from '../../hooks/useToast';

const features = [
  {
    icon: PaletteOutlinedIcon,
    title: 'Make it yours',
    description:
      'A consistent design foundation with thoughtful colors, typography, and room for your own style.',
  },
  {
    icon: DevicesRoundedIcon,
    title: 'Every screen, considered',
    description:
      'Flexible layouts that feel at home on your desktop, tablet, and phone.',
  },
  {
    icon: BoltRoundedIcon,
    title: 'Ready for your next idea',
    description:
      'Routing, data fetching, and notifications are in place. Bring the part that makes it yours.',
  },
];
const tasks = [
  'Choose your colors',
  'Build your first page',
  'Make something great',
];

export default function HomePage() {
  const [completed, setCompleted] = useState<string[]>([tasks[0]]);
  const { showToast } = useToast();

  return (
    <Stack spacing={{ xs: 6, md: 9 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.15fr 1fr' },
          gap: { xs: 5, md: 8 },
          alignItems: 'center',
        }}
      >
        <Box>
          <Chip
            icon={<AutoAwesomeRoundedIcon />}
            label="A fresh start for your next idea"
            size="small"
            sx={{
              bgcolor: 'primary.light',
              color: 'primary.dark',
              mb: 3,
              '& .MuiChip-icon': { color: 'primary.main' },
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.8rem', sm: '3.6rem', md: '4.4rem' },
              maxWidth: 620,
            }}
          >
            Start simple.
            <br />
            Build{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              something
              <br />
              great.
            </Box>
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ mt: 3, maxWidth: 440, fontSize: '1.1rem' }}
          >
            Your next app starts here. A clean, flexible foundation that gives
            your ideas room to grow.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            sx={{ mt: 4, alignItems: { xs: 'stretch', sm: 'center' } }}
          >
            <Button
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={() =>
                showToast(
                  "Your foundation is ready. Let's build something great!",
                  'success',
                )
              }
            >
              Try a notification
            </Button>
            <Button
              component="a"
              href="#foundation"
              sx={{ color: 'text.primary' }}
            >
              Explore the foundation
            </Button>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2.5 }}>
            Your idea. Your pace. Your starting point.
          </Typography>
        </Box>
        <Box
          sx={{
            position: 'relative',
            p: { xs: 2, sm: 4 },
            borderRadius: 6,
            bgcolor: '#eaf0ed',
            backgroundImage:
              'radial-gradient(circle at 90% 10%, #d6e7dc 0, transparent 65%)',
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              p: { xs: 2.5, sm: 3.5 },
              borderRadius: 4,
              boxShadow: '0 18px 48px rgba(32, 55, 43, 0.08)',
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
            >
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{ letterSpacing: 1.8 }}
              >
                YOUR WORKSPACE
              </Typography>
              <Chip label="Live preview" size="small" variant="outlined" />
            </Stack>
            <Typography variant="h5" sx={{ mt: 3 }}>
              Small steps. Big ideas.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try the checklist. Make a little progress.
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mt: 4, mb: 1 }}
            >
              <Typography variant="body2" fontWeight={600}>
                Getting started
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                aria-live="polite"
              >
                {completed.length} of {tasks.length}
              </Typography>
            </Stack>
            <LinearProgress
              aria-label="Checklist progress"
              variant="determinate"
              value={(completed.length / tasks.length) * 100}
              sx={{ height: 6, borderRadius: 3, bgcolor: 'primary.light' }}
            />
            <Stack sx={{ mt: 2 }}>
              {tasks.map((task) => (
                <Stack
                  key={task}
                  component="label"
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ py: 1, cursor: 'pointer' }}
                >
                  <Checkbox
                    checked={completed.includes(task)}
                    onChange={(_, checked) =>
                      setCompleted((previous) =>
                        checked
                          ? [...previous, task]
                          : previous.filter((item) => item !== task),
                      )
                    }
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: completed.includes(task)
                        ? 'text.secondary'
                        : 'text.primary',
                      textDecoration: completed.includes(task)
                        ? 'line-through'
                        : 'none',
                    }}
                  >
                    {task}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Box
              sx={{
                bgcolor: 'background.default',
                p: 2,
                borderRadius: 2,
                mt: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                A preview of what you can build. This checklist resets when you
                reload.
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
      <Box id="foundation" sx={{ scrollMarginTop: 24 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          spacing={1}
          sx={{ mb: 3 }}
        >
          <Typography variant="h5" component="h2">
            A foundation that feels good.
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Less setup. More creating.
          </Typography>
        </Stack>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2.5,
          }}
        >
          {features.map(({ icon: Icon, title, description }) => (
            <Paper key={title} variant="outlined" sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  p: 1.2,
                  borderRadius: 2,
                  mb: 2.5,
                }}
              >
                <Icon />
              </Box>
              <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.8 }}
              >
                {description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}
