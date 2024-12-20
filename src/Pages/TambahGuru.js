import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Swal from 'sweetalert2';

export default function TambahGuru() {
  const navigate = useNavigate();
  const [formguru, setformguru] = useState({
    nama: '',
    mapel: '',
    nik: '',
    jenis_kelamin: '',
    jabatan: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformguru({ ...formguru, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi jika ada field yang kosong
    if (!formguru.nama || !formguru.mapel || !formguru.nik || !formguru.jenis_kelamin || !formguru.jabatan) {
      Swal.fire({
        title: 'Gagal!',
        text: 'Semua field harus diisi.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Kirim data ke API
    axios
      .post('http://localhost:3030/guru', formguru)
      .then((response) => {
        Swal.fire({
          title: 'Berhasil!',
          text: 'Data guru berhasil ditambahkan.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/guru');
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Gagal!',
          text: error.response?.data?.message || 'Terjadi kesalahan saat menambahkan data.',
          icon: 'error',
          confirmButtonText: 'Coba Lagi',
        });
      });
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Tambah Data Guru
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Nama Guru"
            name="nama"
            value={formguru.nama}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Mapel"
            name="mapel"
            value={formguru.mapel}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="NIK"
            name="nik"
            value={formguru.nik}
            onChange={handleChange}
            fullWidth
            required
          />
          {/* Select for Jenis Kelamin */}
          <FormControl fullWidth required>
            <InputLabel id="jenis_kelamin-label">Jenis Kelamin</InputLabel>
            <Select
              labelId="jenis_kelamin-label"
              id="jenis_kelamin"
              name="jenis_kelamin"
              value={formguru.jenis_kelamin}
              onChange={handleChange}
            >
              <MenuItem value="" disabled>
                Pilih Jenis Kelamin
              </MenuItem>
              <MenuItem value="Laki-laki">Laki-laki</MenuItem>
              <MenuItem value="Perempuan">Perempuan</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Jabatan"
            name="jabatan"
            value={formguru.jabatan}
            onChange={handleChange}
            fullWidth
            required
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate('/guru')}
            >
              Batal
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Simpan
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
