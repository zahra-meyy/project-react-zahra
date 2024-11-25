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

    // Log data yang akan dikirim
    console.log('Data yang akan dikirim:', formguru);

    // Kirim data ke API
    axios.post('http://localhost:3030/guru', formguru)
      .then((response) => {
        console.log('Response dari API:', response.data);  // Log response untuk debug
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
        // Cek jika ada error dalam response
        console.error('Error adding data:', error.response || error);
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
          <Select
            label="Jenis Kelamin"
            name="jenis_kelamin"
            value={formguru.jenis_kelamin}
            onChange={handleChange}
            fullWidth
            required
            displayEmpty
          >
            <MenuItem value="" disabled>
              Pilih Jenis Kelamin
            </MenuItem>
            <MenuItem value="Laki-laki">Laki-laki</MenuItem>
            <MenuItem value="Perempuan">Perempuan</MenuItem>
          </Select>
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
