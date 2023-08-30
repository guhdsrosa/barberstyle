import React, { useEffect, useState } from "react";
import { SelectList } from 'react-native-dropdown-select-list'
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "./styles";
import LoadingGif from '../../assets/images/loading/loading.gif'
import Entypo from "react-native-vector-icons/Entypo";
import PieChart from 'react-native-pie-chart'


const Statistics = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState([])
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const data = [
        { key: '1', value: 'do dia' },
        { key: '2', value: '3 dias' },
        { key: '3', value: '5 dias', disabled: true },
        { key: '4', value: '15 dias', disabled: true },
        { key: '5', value: '20 dias' },
        { key: '7', value: '19:00 hrs', disabled: true }
    ]
    console.log(value)
    const style = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
        },
        title: {
            fontSize: 24,
            margin: 10,
        },
    })

    useEffect(() => {
        setLoading(false)
        //     getUserId()
    }, [])

    return (
        <LinearGradient colors={['#ffffff', '#fafafa']} style={styles.container}>
            {loading &&
                <View style={styles.loading}>
                    <FastImage
                        style={{ height: 200, width: 200 }}
                        source={LoadingGif}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={styles.loadingText}>Carregando</Text>
                </View>
            }
            {!loading &&
                <>
                    <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                        <SelectList
                            setSelected={(val) => console.log(val)}
                            data={data}
                            save="value"
                            search={false}
                            dropdownTextStyles={{ color: '#181818' }}
                            disabledTextStyles={{ color: '#b3b3b3' }}
                            placeholder="Selecione o Período"
                            fontFamily="Quicksand-Medium"
                            boxStyles={{ backgroundColor: '#141414' }}
                            inputStyles={{ color: '#fff' }}
                            arrowicon={<Entypo name="chevron-small-down" color={'#fff'} size={20} />}
                        />
                    </View>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={style.container}>
                            <Text style={style.title}>
                                Barber
                            </Text>
                            <PieChart
                                widthAndHeight={250}
                                series={[123, 321, 123, 789, 537]}
                                sliceColor={['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00']}
                            />
                            <Text style={style.title}>
                                Mensal
                            </Text>
                            <PieChart
                                widthAndHeight={250}
                                series={[123, 321, 123, 789, 537]}
                                sliceColor={['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00']}
                                coverRadius={0.90}
                                coverFill={'#FFF'}
                            />
                        </View>
                    </ScrollView>
                </>

            }
        </LinearGradient >
    )
}

export default Statistics