import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Payment.module.css';
import { useCart } from '../../context/CartContext';

export default function PaymentPage() {
    const { clearCart } = useCart();
    const navigate = useNavigate();
    const { state } = useLocation();

    // Dados do carrinho passados via state
    const { total } = state || {};
    const [paymentData, setPaymentData] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        installments: '1'
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentData(prev => ({ ...prev, [name]: value }));
    };

    const handleFakePayment = async () => {
        setIsProcessing(true);

        // Simulação de processamento (2 segundos)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Gera o número de pedido fake e limpa o carrinho depois do pagamento
        const fakeOrderNumber = `DEV-${Date.now().toString().slice(-6)}`;
        clearCart(false); // Limpa o carrinho sem confirmação
        setOrderNumber(fakeOrderNumber);
        setIsPaid(true);
        setIsProcessing(false);
    };

    if (isPaid) {
        return (
            <div className={styles.paymentContainer}>
                <div className={styles.successMessage}>
                    <h2>✅ Compra Finalizada!</h2>
                    <p>
                        Número do pedido: <strong>{orderNumber}</strong>
                    </p>
                    <p>
                        Valor total: <strong>R$ {total?.toFixed(2)}</strong>
                    </p>
                    <p>Esta é uma simulação - nenhum pagamento real foi processado</p>
                    <button
                        onClick={() => navigate('/')}
                        className={styles.backButton}
                    >
                        Voltar à Loja
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.paymentContainer}>
            <h1 className={styles.title}>Pagamento</h1>
            <p className={styles.fakeNotice}>
                Simulação de pagamento - Nenhum dado real será processado
            </p>

            <div className={styles.paymentSection}>
                <h2>Dados do Cartão</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="cardNumber">Número do Cartão</label>
                    <input
                        id="cardNumber"
                        type="text"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="cardName">Nome no Cartão</label>
                    <input
                        id="cardName"
                        type="text"
                        name="cardName"
                        value={paymentData.cardName}
                        onChange={handleInputChange}
                        placeholder="Como escrito no cartão"
                        required
                    />
                </div>
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="expiryDate">Validade</label>
                        <input
                            id="expiryDate"
                            type="text"
                            name="expiryDate"
                            value={paymentData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/AA"
                            maxLength="5"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="cvv">CVV</label>
                        <input
                            id="cvv"
                            type="text"
                            name="cvv"
                            value={paymentData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            maxLength="3"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className={styles.paymentSection}>
                <h2>Parcelamento</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="installments">Opções de Parcelamento</label>
                    <select
                        id="installments"
                        name="installments"
                        value={paymentData.installments}
                        onChange={handleInputChange}
                    >
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>
                                {num}x de R$ {(total / num).toFixed(2)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.paymentSummary}>
                <h2>Resumo do Pedido</h2>
                <p>
                    Total: <strong>R$ {total?.toFixed(2)}</strong>
                </p>
            </div>

            <button
                onClick={handleFakePayment}
                disabled={isProcessing}
                className={styles.paymentButton}
            >
                {isProcessing ? 'Processando...' : 'Finalizar Compra'}
            </button>
        </div>
    );
}