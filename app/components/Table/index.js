import React, { Component } from 'react';
import classNames from 'classnames';
import CheckBox from '../checkbox';
import './table.scss';

class Table extends Component {
    constructor(props) {
        super(props)
        this.rowSelected = []
    }

    handleSelect = ({ data, indexData }) => {
        const dataValid = this.props.dataSource.filter(item => !item.isDisabledRecord)
        if (this[`select${indexData}`].checked) {
            this.rowSelected = [...this.rowSelected, data]
        } else {
            this.rowSelected = this.rowSelected.filter(item => item !== data);
        }
        if ((this.rowSelected.length !== dataValid.length)) {
            this.selectAll.checked = false;
            this.selectAllWrapped.classList.add('checkbox--half-past');
        }
        if (this.rowSelected.length === dataValid.length) {
            this.selectAll.checked = true;
            this.selectAllWrapped.classList.remove('checkbox--half-past');
        }
        if(this.rowSelected.length === 0) {
            this.selectAll.checked = false;
            this.selectAllWrapped.classList.remove('checkbox--half-past');
        }
        this.rowSelected = this.rowSelected.filter(item => !item.isDisabledRecord)
        this.props.select.onSelect(this.rowSelected, indexData);
    }

    handleSelectAll = (data) => {
        if (this.selectAll.checked) {
            this.rowSelected = [...data];
            this.selectAllWrapped.classList.remove('checkbox--half-past');
        } else {
            this.rowSelected = [];
            this.selectAllWrapped.classList.remove('checkbox--half-past');
        }
        for (let index = 0; index < data.length; index++) {
            if (this.selectAll.checked && !this[`select${index}`].disabled) {
                this[`select${index}`]['checked'] = true;
            } else {
                this[`select${index}`]['checked'] = false;
            }
        }
        this.rowSelected = this.rowSelected.filter(item => !item.disabled)
        this.props.select.onSelectAll(this.rowSelected);
    }
    // render title column
    renderColumns = (columns) => {
        if (!columns || columns.length === 0) {
            return (
                <span>columns null</span>
            )
        }
        return (
            columns && columns.map((column, index) => {
                const style = column.style ? column.style : null;
                const customizeClass = column.className ? column.className : null;
                if (this.props.select && this.props.select.all && index === 0) {// select all true
                    return (
                        <div ref={e => this.selectAllWrapped = e} key={index}>
                            <CheckBox
                                className={classNames('mx-10')}
                                ref={e => this.selectAll = e}
                                key={index}
                                onClick={() => this.handleSelectAll(this.props.dataSource)}
                                style={style}
                            />
                        </div>
                    )
                }
                if (this.props.select && index === 0) {
                    return <div key={index} className="mx-10" style={{ width: '10px' }} />
                }
                return <span className={classNames('table__item', customizeClass)} style={style} key={index}>{column.title}</span>
            })
        )
    }
    // render content
    renderContent = (dataSource, loading) => {
        if (!dataSource || dataSource.length === 0) {
            return (
                <div className="table__content table__content--empty">
                    {!loading && <span>Data empty</span>}

                </div>
            )
        }

        return (
            dataSource && dataSource.map((data, indexData) => {
                const isDisabledRow = data.isDisabledRecord;
                return (
                    <div className={classNames('table__row', isDisabledRow ? 'table__row__disabled' : '')} key={indexData}>
                        {this.props.columns && this.props.columns.map((col, index) => {
                            const customizeClass = col.className ? col.className : null;
                            const style = col.style ? col.style : null;
                            if (this.props.select && index === 0) {
                                return (
                                    <CheckBox
                                        className="mx-10"
                                        ref={e => this[`select${indexData}`] = e}
                                        key={index}
                                        onClick={() => this.handleSelect({ data, indexData })}
                                        disabled={isDisabledRow}
                                        style={style}
                                    />
                                )
                            }
                            if (col.dataIndex === 'stt') {
                                return <p className={classNames('table__item', customizeClass)} style={style} key={index}>{indexData + 1}</p>
                            }
                            if (col.dataIndex === 'action') {
                                return (
                                    <div className={classNames('table__item', isDisabledRow ? 'table__item__disabled' : '', customizeClass)} style={style} key={index}>
                                        {col.render(data, indexData + 1)}
                                    </div>
                                )
                            }

                            if (typeof col.render === 'function') {
                                return (
                                    <div className={classNames('table__item', customizeClass)} style={style} key={index}>
                                        {col.render(data[col.dataIndex], indexData + 1)}
                                    </div>
                                )
                            }
                            if (data.hasOwnProperty(col.key) && !!data[col.key]) {
                                return (
                                    <p className={classNames('table__item', customizeClass)} style={style} key={index}>{data[col.key]}</p>
                                )
                            }

                            return <p className={classNames('table__item', customizeClass)} style={style} key={index}>-</p>
                        })}
                    </div>
                )
            })

        )
    }
    render() {
        const { columns, dataSource, loading } = this.props;
        return (
            <div className="table">
                <div className="table__col">{this.renderColumns(columns)}</div>
                <div className="table__content">
                    {loading && <div className="overlay"><span className="table__loading">loading...</span></div>}
                    {this.renderContent(dataSource, loading)}
                </div>
            </div>
        )
    }
}
// add more option in table

Table.displayName = "Table";

Table.propTypes = {
}

Table.defaultProps = {
}
export default Table;