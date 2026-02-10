<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Masuk - Gerak & Gaya</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <style>
        :root { 
            --primary: #f95c50; 
            --primary-dark: #e44a3f; 
            --bg-light: #fffcfb; 
            --text: #333; 
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
        
        body { 
            background-color: #fff; 
            height: 100vh; 
            width: 100vw;
            overflow: hidden; 
        }

        .auth-container {
            width: 100%;
            height: 100%;
            display: flex;
            background: #fff;
            box-shadow: none;
            border-radius: 0;
        }

        /* --- BAGIAN KIRI --- */
        .auth-left {
            width: 45%; 
            background: linear-gradient(135deg, var(--primary), #ff9b91);
            display: flex; 
            flex-direction: column; 
            justify-content: center; 
            align-items: center;
            padding: 60px; 
            color: white; 
            text-align: center; 
            position: relative; 
            overflow: hidden;
        }

        .auth-left h2 { font-size: 38px; margin-bottom: 15px; font-weight: 700; z-index: 2; }
        .auth-left p { font-size: 16px; opacity: 0.95; line-height: 1.6; max-width: 90%; z-index: 2; }

        .floating-icon { position: absolute; font-size: 120px; opacity: 0.15; animation: float 6s infinite ease-in-out; }
        .icon-1 { top: 10%; left: 10%; }
        .icon-2 { bottom: 15%; right: 10%; animation-delay: 2s; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }

        /* --- BAGIAN KANAN --- */
        .auth-right { 
            flex: 1; 
            padding: 40px 80px; 
            display: flex; 
            flex-direction: column; 
            justify-content: center; 
            overflow-y: auto; 
            background-color: #fff;
        }

        .auth-header { margin-bottom: 30px; }
        .auth-header h3 { font-size: 28px; color: var(--text); font-weight: 700; margin-bottom: 5px;}
        .auth-header p { color: #888; font-size: 14px; }

        .form-group { margin-bottom: 20px; transition: all 0.3s ease; }
        .form-group label { display: block; font-size: 14px; font-weight: 600; color: #555; margin-bottom: 8px; }
        
        .form-control {
            width: 100%; padding: 14px 18px; border: 2px solid #f0f0f0; border-radius: 12px;
            font-size: 14px; transition: 0.3s; outline: none; background: #fafafa;
        }
        .form-control:focus { border-color: var(--primary); background: #fff; box-shadow: 0 0 0 4px rgba(249, 92, 80, 0.1); }
        
        /* Style jika input error (Merah) */
        .form-control.is-invalid {
            border-color: #e74c3c;
            background-color: #fff5f5;
        }

        select.form-control {
            appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 15px center;
            background-size: 16px;
            cursor: pointer;
        }

        .btn-primary {
            width: 100%; padding: 16px; background: var(--primary); color: white; border: none;
            border-radius: 12px; font-size: 16px; font-weight: 600; cursor: pointer; transition: 0.3s; margin-top: 10px;
            box-shadow: 0 10px 20px rgba(249, 92, 80, 0.15);
        }
        .btn-primary:hover { background: var(--primary-dark); transform: translateY(-2px); box-shadow: 0 15px 25px rgba(249, 92, 80, 0.25); }

        /* Footer Link */
        .footer-link { text-align: center; margin-top: 25px; font-size: 14px; color: #666; }
        .footer-link a { color: var(--primary); text-decoration: none; font-weight: 700; transition: 0.2s;}
        .footer-link a:hover { text-decoration: underline; color: var(--primary-dark); }

        /* Back to Home Link */
        .back-home {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
        }
        .back-home a {
            color: #888;
            text-decoration: none;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
        }
        .back-home a:hover {
            color: var(--primary);
            transform: translateX(-5px);
        }

        .input-group { position: relative; width: 100%; }
        .form-control.password-input { padding-right: 45px; }
        
        .toggle-password {
            position: absolute; right: 15px; top: 50%; transform: translateY(-50%);
            cursor: pointer; color: #aaa; font-size: 18px; transition: 0.3s; z-index: 10;
        }
        .toggle-password:hover { color: var(--primary); }

        /* Kotak Error Global (Untuk Email Salah) */
        .error-box {
            background-color: #fff5f5; color: #e74c3c; padding: 15px; 
            border-radius: 10px; margin-bottom: 25px; font-size: 13px; 
            border-left: 5px solid #e74c3c;
            display: flex; align-items: center; gap: 10px;
        }

        /* Teks Error Kecil (Untuk Password/Kelas Salah) */
        .invalid-feedback {
            color: #e74c3c;
            font-size: 12px;
            margin-top: 5px;
            font-weight: 500;
            display: block;
        }

        @media (max-width: 900px) {
            .auth-container { flex-direction: column; overflow-y: auto; }
            .auth-left { display: none; } 
            .auth-right { width: 100%; padding: 40px 25px; flex: none; min-height: 100vh; }
        }
    </style>
</head>
<body>

    <div class="auth-container">
        <div class="auth-left">
            <div class="floating-icon icon-1">🚀</div>
            <div class="floating-icon icon-2">⚛️</div>
            
            <h2>Selamat Datang!</h2>
            <p>Siap melanjutkan petualangan? Masuk sekarang untuk mengakses materi gerak dan gaya.</p>
        </div>

        <div class="auth-right">
            <div class="auth-header">
                <h3>Masuk ke Akun</h3>
                <p>Silakan masukkan Akun Kamu untuk melanjutkan.</p>
            </div>

            @if ($errors->has('email'))
                <div class="error-box">
                    <i class="fas fa-exclamation-circle"></i> 
                    <span>{{ $errors->first('email') }}</span>
                </div>
            @endif

            <form action="{{ route('login') }}" method="POST">
                @csrf
                
                <div class="form-group">
                    <label>Masuk Sebagai</label>
                    <select id="roleSelect" name="peran_login" class="form-control" onchange="toggleForm()">
                        <option value="siswa" {{ old('peran_login') == 'siswa' ? 'selected' : '' }}>Siswa</option>
                        <option value="guru" {{ old('peran_login') == 'guru' ? 'selected' : '' }}>Guru</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" class="form-control @error('email') is-invalid @enderror" placeholder="nama@email.com" value="{{ old('email') }}" required>
                </div>

                <div class="form-group" id="kelasGroup">
                    <label>Kelas</label>
                    <select name="kelas_id_login" class="form-control @error('kelas_id_login') is-invalid @enderror">
                        <option value="">-- Pilih Kelas Kamu --</option>
                        @if(isset($data_kelas))
                            @foreach($data_kelas as $kelas)
                                <option value="{{ $kelas->id }}">{{ $kelas->nama }}</option>
                            @endforeach
                        @else
                            <option value="" disabled>Data kelas tidak ditemukan</option>
                        @endif
                    </select>
                    
                    @error('kelas_id_login')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>

                <div class="form-group">
                    <label>Kata Sandi</label>
                    <div class="input-group">
                        <input type="password" name="password" id="password" class="form-control password-input @error('password') is-invalid @enderror" placeholder="••••••••" required>
                        <i class="fa-regular fa-eye toggle-password" id="icon-pass" onclick="toggleVisibility('password', 'icon-pass')"></i>
                    </div>
                    
                    @error('password')
                        <span class="invalid-feedback">{{ $message }}</span>
                    @enderror
                </div>

                <button type="submit" class="btn-primary">Masuk Sekarang</button>
            </form>

            <div class="footer-link">
                Belum punya akun? <a href="{{ route('register') }}">Daftar di sini</a>
            </div>

            <div class="back-home">
                <a href="{{ route('home') }}">
                    <i class="fa-solid fa-arrow-left"></i> Kembali ke beranda
                </a>
            </div>

        </div>
    </div>

    <script>
        // Fungsi Toggle Password
        function toggleVisibility(inputId, iconId) {
            var input = document.getElementById(inputId);
            var icon = document.getElementById(iconId);
            
            if (input.type === "password") {
                input.type = "text";
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = "password";
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }

        // Fungsi Toggle Form Berdasarkan Peran
        function toggleForm() {
            var role = document.getElementById('roleSelect').value;
            var kelasGroup = document.getElementById('kelasGroup');

            if (role === 'siswa') {
                kelasGroup.style.display = 'block'; 
            } else {
                kelasGroup.style.display = 'none';
                // Reset pilihan kelas jika pindah ke Guru agar tidak ada error validasi
                document.querySelector('select[name="kelas_id_login"]').value = ""; 
            }
        }

        // Jalankan saat halaman dimuat
        document.addEventListener("DOMContentLoaded", function() {
            toggleForm();
        });
    </script>

</body>
</html>