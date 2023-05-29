const express = require('express');
const router = express.Router();
import { generateTokenMiddleware } from '../middleware/authenticateJWT';
import { jwtMiddleware } from '../middleware/authenticateJWT';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

router.post('/register', (req, res) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then((userCredential) => {
            const user = userCredential.user;
            res.json({
                ok: true,
                data: {
                    user
                }
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.json({
                ok: false,
                data: {
                    errorCode,
                    errorMessage
                }
            });
        });
});

router.post('/login', generateTokenMiddleware, (req, res) => {
    const auth = getAuth();    

    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then((userCredential) => {
            const user = userCredential.user;
            res.json({
                ok: true,
                data: {
                    user
                }
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.json({
                ok: false,
                data: {
                    errorCode,
                    errorMessage
                }
            });
        });
});

router.get('/logout', (req, res) => {
    const auth = getAuth();
    signOut(auth).then(() => {
        res.json({
            ok: true,
            data: {
                message: 'Logout successfully'
            }
        });
    }).catch((error) => {
        res.json({
            ok: false,
            data: {
                message: 'Logout failed'
            }
        });
    });
});

router.post('/verify', jwtMiddleware, (req, res) => {
    res.json({
        ok: true,
        user: {
            email: req.userData.email
        }
    });
});

module.exports = router;