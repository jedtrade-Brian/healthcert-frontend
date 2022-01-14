import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

function PdfDocument(props) {
    let certificate = props.certificate;
    const styles = StyleSheet.create({
        page: {
            backgroundColor: "#ffffff",
            fontSize: 10,
            padding: 10,
            position: 'relative',
        },

        certSection: {
            marginTop: 80,
            marginLeft: -40,
            marginRight: -40,
            textAlign: "center",
            display: 'flex',
            flexDirection: 'column',
        },

        transcriptSection: {
            marginTop: 20,
            paddingHorizontal: 10,
            textAlign: "center",
            display: 'flex',
            flexDirection: 'column',
        },

        qrcode: {
            height: 100,
            width: 100,
            alignSelf: 'flex-end'
        },

        certificate: {
            maxWidth: 950,
            maxHeight: 1100,
            transform: "rotate(90deg)",
        },
        
        transcript: {
            maxWidth: 550,
            maxHeight: 750,
        },

        qrcodeSection: {
            position: 'absolute',
            bottom: 15,
            right: 10,
        },

    });

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.certSection}>
                    <Image src={props.certURL[0]} style={styles.certificate} />
                </View>
                <View style={styles.qrcodeSection}>
                    <Image src={props.qrURL} style={styles.qrcode} />
                    <Text>Scan QR Code to verify the certificate</Text>
                </View>
            </Page>
            <Page style={styles.page}>
                <View style={styles.transcriptSection}>
                    <Image src={props.certURL[1]} style={styles.transcript} />
                </View>
            </Page>
        </Document>
    )
}

export default PdfDocument
